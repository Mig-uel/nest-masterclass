import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import AWSConfig from 'src/config/aws.config';
import type { Repository } from 'typeorm';
import { Upload } from '../entities/upload.entity';
import { FileTypes } from '../enums/file-types.enum';
import type { UploadFile } from '../interfaces/upload-file.interface';
import { UploadToAwsProvider } from './upload-to-aws.provider';

@Injectable()
export class UploadsService {
  /**
   * Inject UploadToAwsProvider, Upload Repository, AWSConfig
   */
  constructor(
    private readonly uploadToAWSProvider: UploadToAwsProvider,
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    @Inject(AWSConfig.KEY)
    private readonly awsConfigService: ConfigType<typeof AWSConfig>,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      // Throw error for unsupported MIME types
      if (!['image/gif', 'image/jpg', 'image/png'].includes(file.mimetype))
        throw new BadRequestException('Mime type not supported...');

      // Upload file to AWS S3
      const s3FileName = await this.uploadToAWSProvider.fileUpload(file);

      // Generate new entry in database
      const uploadFile: UploadFile = {
        name: s3FileName,
        path: `https://${this.awsConfigService.awsCloudfrontUrl}/${s3FileName}`,
        mime: file.mimetype,
        size: file.size,
        type: FileTypes.IMAGE,
      };

      const upload = this.uploadRepository.create(uploadFile);

      return await this.uploadRepository.save(upload);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new RequestTimeoutException(error);
    }
  }
}
