import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { WinstonLogger } from './infrastructure/winston.logger'; // Importăm logger-ul Winston

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
    WinstonLogger.info('TestController was initialized'); // Log la inițializare
  }

  @Get()
  getInstanceId() {
    WinstonLogger.debug('GET /test was called'); // Log pentru apelul rutei
    const instanceId = this.testService.getId();
    WinstonLogger.info(`Instance ID returned: ${instanceId}`); // Log pentru rezultat
    return { id: instanceId };
  }
}
