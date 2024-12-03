import { NestFactory } from "@nestjs/core";
import { TenantModule } from "./tenants/module/tenant.module";
import { AppModule } from "./app.module";
//import { OptionsInterceptor } from '../interceptor';

console.log('Entering main.ts...'); // Log inițial

async function bootstrap() {
  console.log('Initializing application...');

  const app = await NestFactory.create(AppModule);

  // Activează CORS
  app.enableCors(); // Permite toate originile (sau configurează specific)
  console.log('CORS enabled');

  // Activează interceptorul global
  //app.useGlobalInterceptors(new OptionsInterceptor());
  console.log('Global interceptors added');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Backend is running on http://localhost:${port}`);
}

bootstrap();
