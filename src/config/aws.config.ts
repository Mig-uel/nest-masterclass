import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  awsRegion: process.env.AWS_REGION,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
}));
