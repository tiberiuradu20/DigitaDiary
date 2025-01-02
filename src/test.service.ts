import { Injectable, Scope } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { WinstonLogger } from './infrastructure/winston.logger'; // Importăm logger-ul configurat

@Injectable({ scope: Scope.REQUEST })
export class TestService {
  private readonly id: string;

  constructor() {
    this.id = randomUUID();
    WinstonLogger.info(`TestService instance created with ID: ${this.id}`); // Înlocuiește console.log
  }

  getId(): string {
    WinstonLogger.debug(`Returning ID: ${this.id}`); // Adăugare log de tip debug
    return this.id;
  }
}
