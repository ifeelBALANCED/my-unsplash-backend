import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class PhotoInput implements Prisma.PhotoCreateInput {
    @ApiProperty()
    id: number;

    @ApiProperty()
    label: string;

    @ApiProperty()
    photoUrl: string;
}

export class PhotoQuery {
    @ApiProperty()
    label?: string
}