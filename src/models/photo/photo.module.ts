import { PrismaService } from '../../database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { AwsSdkService } from '../aws-sdk/aws-sdk.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [PhotoController],
    providers: [PhotoService, PrismaService, AwsSdkService],
})
export class PhotoModule {}
