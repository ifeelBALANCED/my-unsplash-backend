import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { Photo, Prisma } from '@prisma/client';
import { PhotoQueryParams } from '../aws-sdk/aws-sdk.types';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Post()
    create(@Body() photoCreateInput: Prisma.PhotoCreateInput) {
        return this.photoService.createOne(photoCreateInput);
    }

    @Get()
    findAll(@Query() query: PhotoQueryParams): Promise<Photo[]> {
        return this.photoService.findAll(query);
    }

    @Get(':id')
    findByLabel(@Param('id') id: string): Promise<Photo> {
        return this.photoService.findById(Number(id));
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.photoService.removeOne({ id: Number(id) });
    }
}
