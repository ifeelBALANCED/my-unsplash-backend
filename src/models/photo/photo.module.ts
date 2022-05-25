import { PrismaService } from '../../database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [PhotoController],
    providers: [PhotoService, PrismaService],
})
export class PhotoModule {}
