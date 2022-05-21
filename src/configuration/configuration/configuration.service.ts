import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
    public port;
    constructor() {
        this.port = process.env.PORT || 5000;
    }
}
