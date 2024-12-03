import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getInstanceId() {
    // Returnează ID-ul unic al instanței serviciului
    return { id: this.testService.getId() };
  }
}
