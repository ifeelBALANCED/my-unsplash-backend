import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
    public port;
    constructor() {
        this.port = process.env.APP_PORT || 5000;
    }
}
