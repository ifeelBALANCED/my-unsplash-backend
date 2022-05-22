export type MulterFile = {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
};

export type PhotoQueryParams = {
    label: string;
}