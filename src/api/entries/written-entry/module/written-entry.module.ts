import { Module } from '@nestjs/common';
import { WrittenEntryService } from '../service/written-entry.service';
import { WrittenEntryController } from '../controller/written-entry.controller';
import { PrismaService } from '../../../../tenants/service/tenant.service';

@Module({
  controllers: [WrittenEntryController],
  providers: [WrittenEntryService, PrismaService],
  exports: [WrittenEntryService], // Exportă serviciul dacă este folosit în alte module
})
export class WrittenEntryModule {}
