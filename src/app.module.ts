import { Module } from "@nestjs/common";
import { ApiModule } from "./api/api.module";
import { AuthModule } from "./auth/module/auth.module";
import { TenantModule } from "./tenants/module/tenant.module";

@Module({
    imports: [TenantModule, ApiModule, AuthModule],
})
export class AppModule {}
