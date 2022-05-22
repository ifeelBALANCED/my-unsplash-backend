import { PrismaService } from './../../database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AwsSdkService } from './aws-sdk.service';

@Module({
    providers: [AwsSdkService, PrismaService],
})
export class AwsSdkModule {}
