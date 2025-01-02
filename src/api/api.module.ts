import { Module } from "@nestjs/common";
import { UserService } from "./user/service/user.service";
import { MembershipService } from "./membership/service/membership.service";
import { TenantModule } from "../tenants/module/tenant.module";
import { PrismaModule } from "../tenants/module/prisma.module";
import { UserController } from "./user/controller/user.controller";
import { MembershipController } from "./membership/controller/membership.controller";
import { UserModule } from "./user/module/user.module";
import { UserMembershipModule } from "./user-membership/module/user-membership.module";
import { UserMembershipController } from "./user-membership/controller/user-membership.controller";
import { UserMembershipService } from "./user-membership/service/user-membership.business";

// Importă modulele și controller-ele pentru intrări
import { WrittenEntryModule } from "./entries/written-entry/module/written-entry.module";
import { AudioEntryModule } from "./entries/audio-entry/module/audio-entry.module";
import { WrittenEntryController } from "./entries/written-entry/controller/written-entry.controller";
import { AudioEntryController } from "./entries/audio-entry/controller/audio-entry.controller";

@Module({
  imports: [
    PrismaModule,
    UserModule,
    UserMembershipModule,
    WrittenEntryModule, // Modul pentru intrări scrise
    AudioEntryModule,   // Modul pentru intrări audio
  ],
  controllers: [
    UserController,
    MembershipController,
    UserMembershipController,
    WrittenEntryController, // Controller pentru intrări scrise
    AudioEntryController,   // Controller pentru intrări audio
  ],
  providers: [
    UserService,
    MembershipService,
    UserMembershipService,
  ],
  exports: [
    UserService,
    MembershipService,
    UserMembershipService,
  ],
})
export class ApiModule {}
