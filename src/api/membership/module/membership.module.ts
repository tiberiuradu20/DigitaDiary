import { Module } from "@nestjs/common";
import { MembershipService } from "../service/membership.service";
import { MembershipController } from "../controller/membership.controller";
import { PrismaModule } from "../../../tenants/module/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
