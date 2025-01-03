import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/module/auth.module';
import { TenantModule } from './tenants/module/tenant.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { TestModule } from 'test.module';
@Module({
  imports: [
    TenantModule,         
    ApiModule,            // Modulul API pentru utilizatori și membership
    AuthModule,           // Modulul pentru autentificare
    InfrastructureModule,
    TestModule // Modulul central pentru infrastructură și injectare de dependențe
  ],
})
export class AppModule {}
