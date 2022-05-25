import { PrismaService } from '../../database/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Photo, Prisma } from '@prisma/client';
import { PhotoQueryParams } from './photo.types';

@Injectable()
export class PhotoService {
    constructor(private readonly prisma: PrismaService) {}

    async createOne(photoCreateInput: Prisma.PhotoCreateInput) {
        const data = {
            ...photoCreateInput,
            password: this.generatePassword(),
        };
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

    async removeOne(id: number): Promise<Photo> {
        try {
            const $photo = await this.prisma.photo.delete({ where: { id } });
            return $photo;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new HttpException(`You can't delete photo which doesn't exist`, HttpStatus.NOT_FOUND);
            } else console.error(error);
        }
    }

    generatePassword = () => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const passwordLength = 12;
        let password = '';
        for (let i = 0; i <= passwordLength; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    };
}
