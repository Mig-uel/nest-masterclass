import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { extname } from 'path';
import AWSConfig from 'src/config/aws.config';

@Injectable()
export class UploadToAwsProvider {
  /**
   * Inject AWSConfig
   */
  constructor(
    @Inject(AWSConfig.KEY)
    private readonly awsConfigService: ConfigType<typeof AWSConfig>,
  ) {}

  async fileUpload(file: Express.Multer.File) {
    try {
      const s3 = new S3();

      const uploadResult = await s3
        .upload({
          Bucket: this.awsConfigService.awsBucketName!,
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    // Extract file name
    const name = file.originalname.split('.')[0];

    // Remove white spaces
    name.replace(/\s/g, '').trim();

    // Extract the extension
    const ext = extname(file.originalname);

    // Generate time stamp
    const timestamp = Date.now();

    // Return file uuid
    return `${name}-${timestamp}-${crypto.randomUUID()}${ext}`;
  }
}
