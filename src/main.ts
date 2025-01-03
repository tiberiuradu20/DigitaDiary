import { NestFactory } from "@nestjs/core";
import { TenantModule } from "./tenants/module/tenant.module";
import { AppModule } from "./app.module";
//import { OptionsInterceptor } from '../interceptor';
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from './all-exceptions.filter';
console.log('Entering main.ts...'); // Log inițial


async function bootstrap() {
  console.log('Initializing application...');

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  // Activează validarea globală
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimină câmpurile care nu sunt definite în DTO
      forbidNonWhitelisted: true, // Aruncă eroare dacă există câmpuri suplimentare
      transform: true, // Transformă automat valorile în tipurile definite în DTO
    }),
  );
  console.log('ValidationPipe enabled');

  // Activează CORS
  app.enableCors();
  console.log('CORS enabled');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Backend is running on http://localhost:${port}`);
}
bootstrap();
