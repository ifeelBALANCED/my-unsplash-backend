import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule, { cors: true });
    const config = new DocumentBuilder().setTitle('My Unsplash API').setDescription('The My Unsplash API').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/v1', app, document);
    app.enableShutdownHooks();
    await app.listen(AppModule.port || 4000);
};

bootstrap();
