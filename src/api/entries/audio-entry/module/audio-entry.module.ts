import { Module } from '@nestjs/common';
import { AudioEntryService } from '../service/audio-entry.service';
import { AudioEntryController } from '../controller/audio-entry.controller';
import { PrismaService } from '../../../../tenants/service/tenant.service';;

@Module({
  controllers: [AudioEntryController],
  providers: [AudioEntryService, PrismaService],
  exports: [AudioEntryService], // Exportă serviciul dacă este folosit în alte module
})
export class AudioEntryModule {}
