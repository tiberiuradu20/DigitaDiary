import { Module } from "@nestjs/common";
import { UserService } from "./user/service/user.service";
import { MembershipService } from "./membership/service/membership.service";
import { TenantModule } from "../tenants/module/tenant.module";
import { PrismaModule } from "../tenants/module/prisma.module"
import { UserController } from "./user/controller/user.controller";
import { MembershipController } from "./membership/controller/membership.controller";
import { UserModule } from "./user/module/user.module";
import { UserMembershipModule } from "./user-membership/module/user-membership.module";
import { UserMembershipController } from "./user-membership/controller/user-membership.controller";
import { UserMembershipService } from "./user-membership/service/user-membership.business";
@Module({
  imports: [PrismaModule,UserModule, UserMembershipModule],
  controllers: [UserController, MembershipController, UserMembershipController],
  providers: [UserService, MembershipService, UserMembershipService],
  exports: [UserService, MembershipService, UserMembershipService],
})
export class ApiModule {}