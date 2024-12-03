import { Module } from '@nestjs/common';
import { PrismaService } from '../tenants/service/tenant.service';
import { UserBusiness } from '../api/user/service/user.business';
import { UserService } from '../api/user/service/user.service';

@Module({
  providers: [
    PrismaService, // Serviciu pentru accesul la baza de date
    UserBusiness,  // Business Layer-ul pentru utilizatori
    UserService,   // Service-ul pentru utilizatori
  ],
  exports: [
    PrismaService, // Exportăm serviciile pentru a putea fi utilizate în alte module
    UserBusiness,
    UserService,
  ],
})
export class InfrastructureModule {}
