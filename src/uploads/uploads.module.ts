import { Module } from '@nestjs/common';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { UploadsService } from './providers/uploads.service';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UploadToAwsProvider]
})
export class UploadsModule {}
