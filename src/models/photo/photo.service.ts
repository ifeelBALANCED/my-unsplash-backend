import { AwsSdkService } from '../aws-sdk/aws-sdk.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { Photo, Prisma } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { MulterFile, PhotoQueryParams } from '../aws-sdk/aws-sdk.types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PhotoService {
    constructor(private readonly prisma: PrismaService, private readonly awsSdk: AwsSdkService, private readonly httpService: HttpService) {}

    async createOne(photoCreateInput: Prisma.PhotoCreateInput) {
        const $response = await this.httpService.get(photoCreateInput.photoUrl, { responseType: 'arraybuffer' });
        const $output = await firstValueFrom($response);
        const file: MulterFile = {
            buffer: $output.data,
            originalname: photoCreateInput.label,
            mimetype: $output.headers['content-type'],
        };
        const $uploadFile = await this.awsSdk.uploadFile(file);
        const $label = await this.findByLabel(photoCreateInput.label);
        const $photoUrl = await this.findByUrl(photoCreateInput.photoUrl);
        if (!$label || !$photoUrl) {
            throw new HttpException('No label or photo url specified', HttpStatus.BAD_REQUEST);
        }
        const data = { label: photoCreateInput.label, photoUrl: $uploadFile.Location };
        return await this.prisma.photo.create({ data });
    }

    async findAll(query?: PhotoQueryParams): Promise<Photo[]> {
        if (query.label) {
            return await this.prisma.photo.findMany({ where: { label: query.label } });
        }
        return await this.prisma.photo.findMany();
    }

    async findById(id: number): Promise<Photo> {
        const $photo = await this.prisma.photo.findUnique({ where: { id } });
        if (!$photo) {
            throw new HttpException('There is no photo with that id', HttpStatus.NOT_FOUND);
        }
        return $photo;
    }

    async findByLabel(label: string): Promise<Photo> {
        return await this.prisma.photo.findFirst({ where: { label } });
    }

    async findByUrl(photoUrl: string): Promise<Photo> {
        return await this.prisma.photo.findFirst({ where: { photoUrl } });
    }

    async removeOne(id: number): Promise<Photo> {
        try {
            const $photo = await this.prisma.photo.delete({ where: { id } });
            return $photo;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new HttpException(`You can't delete photo which doesnt't exist`, HttpStatus.NOT_FOUND);
            } else console.error(error);
        }
    }
}
