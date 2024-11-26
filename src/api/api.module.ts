import { Module } from "@nestjs/common";
import { UserService } from "./user/service/user.service";
import { MembershipService } from "./membership/service/membership.service";
import { TenantModule } from "../tenants/module/tenant.module";
import { PrismaModule } from "../tenants/module/prisma.module"
import { UserController } from "./user/controller/user.controller";
import { MembershipController } from "./membership/controller/membership.controller";

@Module({
  imports: [PrismaModule],
  controllers: [UserController, MembershipController],
  providers: [UserService, MembershipService],
  exports: [UserService, MembershipService],
})
export class ApiModule {}