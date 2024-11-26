import { NestFactory } from "@nestjs/core";
import { TenantModule } from "./tenants/module/tenant.module";
import { AppModule } from "./app.module";
import { OptionsInterceptor } from '../interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activează CORS
  /*app.enableCors({
    origin: 'http://localhost:3001', // Permite accesul doar din frontend-ul React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Metode HTTP permise
    credentials: true, // Permite trimiterea cookie-urilor sau a altor credențiale
  });*/
  app.useGlobalInterceptors(new OptionsInterceptor());
  app.enableCors(); // Permite toate originile Cross-Origin-Resource-Sharing

  const port = process.env.PORT || 3000;
  await app.listen(port);
 /// await app.listen(3000);
  console.log(`Backend is running on http://localhost:3000`);
}
bootstrap();
