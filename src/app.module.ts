import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationService } from './config/global/configuration.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { AwsSdkModule } from './models/aws-sdk/aws-sdk.module';
import { PhotoModule } from './models/photo/photo.module';

@Module({
    imports: [PrismaModule, PhotoModule, AwsSdkModule, SwaggerModule],
    controllers: [AppController],
    providers: [AppService, ConfigurationService],
})
export class AppModule {
    static port: number;

    constructor(private readonly configurationService: ConfigurationService) {
        AppModule.port = this.configurationService.port as number;
    }
}
