import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../tenants/service/tenant.service';
import { UpdateAudioEntryDto } from '../dto/update-audio-entry.dto';
import { CreateAudioEntryDto } from '../dto/create-audio-entry.dto';
@Injectable()
export class AudioEntryService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, fileUrl: string, duration: number) {
    return this.prisma.audioEntry.create({
      data: {
        userId,
        fileUrl,
        duration,
      },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.audioEntry.findMany({
      where: { userId },
    });
  }

  async deleteById(id: number) {
    return this.prisma.audioEntry.delete({
      where: { id },
    });
  }

  async update(id: number, updateAudioEntryDto: UpdateAudioEntryDto) {
    return this.prisma.audioEntry.update({
      where: { id },
      data: {
        ...updateAudioEntryDto,
      },
    });
  }

}
