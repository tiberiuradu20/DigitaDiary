import { Module } from '@nestjs/common';
import { UserMembershipService } from '../service/user-membership.business'; 
import { PrismaModule } from '../../../tenants/module/prisma.module';
import { UserMembershipController } from '../controller/user-membership.controller';

@Module({
  imports: [PrismaModule], // Importăm PrismaModule pentru acces la baza de date
  providers: [
    UserMembershipService,
  ],
  controllers: [UserMembershipController],// Controller-ul pentru utilizatori
  exports: [UserMembershipService], 
})
export class UserMembershipModule {}
