import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { MulterFile } from './aws-sdk.types';

@Injectable()
export class AwsSdkService {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    async uploadFile(file: MulterFile) {
        const { originalname } = file;
        return this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
    }

    async s3_upload(file: Buffer, bucket: string, name: string, mimetype: string) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: {
                LocationConstraint: 'ap-south-1',
            },
        };

        console.log(params);

        try {
            const s3Response = await this.s3.upload(params).promise();
            console.log(s3Response);
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }
}
