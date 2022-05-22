import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Photo, Prisma } from '@prisma/client';
import { PhotoQueryParams } from '../aws-sdk/aws-sdk.types';
import { PhotoInput, PhotoQuery } from './photo.dto';
import { PhotoService } from './photo.service';

@ApiTags('Photo')
@Controller('/api/v1/photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) {}

    @Post()
    @ApiBody({ type: PhotoInput })
    @ApiOperation({ summary: 'Adds a new photo to the gallery' })
    create(@Body() photoCreateInput: Prisma.PhotoCreateInput) {
        return this.photoService.createOne(photoCreateInput);
    }

    @Get()
    @ApiQuery({ name: 'label', type: PhotoQuery })
    @ApiBody({ type: PhotoInput, isArray: true })
    @ApiOperation({ summary: 'Get all photos, you can also search a photo by label' })
    findAll(@Query() query: PhotoQueryParams): Promise<Photo[]> {
        return this.photoService.findAll(query);
    }

    @Get(':id')
    @ApiBody({ type: PhotoInput })
    @ApiOperation({ summary: 'Gets one photo by id' })
    findByLabel(@Param('id') id: string): Promise<Photo> {
        return this.photoService.findById(Number(id));
    }

    @Delete(':id')
    @ApiBody({ type: PhotoInput })
    @ApiOperation({ summary: 'Deletes one photo by id' })
    remove(@Param('id') id: string) {
        return this.photoService.removeOne({ id: Number(id) });
    }
}
