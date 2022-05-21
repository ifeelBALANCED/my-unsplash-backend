import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationService } from './configuration/configuration/configuration.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule {
  static port: number;

  constructor(private readonly configurationService: ConfigurationService) {
    AppModule.port = this.configurationService.port as number;
  }
}
