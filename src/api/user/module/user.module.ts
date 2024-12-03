import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserBusiness } from '../service/user.business';
import { UserController } from '../controller/user.controller';
import { PrismaModule } from '../../../tenants/module/prisma.module';

@Module({
  imports: [PrismaModule], // Importăm PrismaModule pentru acces la baza de date
  providers: [
    UserService, // Serviciul principal
    UserBusiness, // Business Layer-ul adăugat
  ],
  controllers: [UserController], // Controller-ul pentru utilizatori
})
export class UserModule {}
