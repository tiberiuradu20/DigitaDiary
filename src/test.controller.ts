import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
    console.log("TestController was called ")
  }

  @Get()
  getInstanceId() {
    // Returnează ID-ul unic al instanței serviciului
    console.log("GET /test was called")
    return { id: this.testService.getId() };
  }
}
