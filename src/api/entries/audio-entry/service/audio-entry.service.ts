import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../tenants/service/tenant.service';
import { UpdateAudioEntryDto } from '../dto/update-audio-entry.dto';
import { CreateAudioEntryDto } from '../dto/create-audio-entry.dto';
import { subDays } from 'date-fns';
@Injectable()
export class AudioEntryService {
  constructor(private prisma: PrismaService) {}

  async canAddAudioEntry(userId: number): Promise<boolean> {
    // Găsește abonamentul utilizatorului
    const subscription = await this.prisma.userSubscription.findFirst({
      where: { userId },
      include: { membership: true },
    });
  
    if (!subscription) {
      throw new Error('Utilizatorul nu are un abonament activ.');
    }
  
    // Numără intrările scrise create azi
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Începutul zilei curente
  
    const count = await this.prisma.audioEntry.count({
      where: {
        userId,
        createdAt: {
          gte: todayStart, // Filtrare pentru intrările create după începutul zilei
        },
      },
    });
  
    // Compară cu limita zilnică
    return count < subscription.membership.nr_maxim_intrari_Audio;
  }
  
  
  async create(userId: number, fileUrl: string, duration: number) {
     const adauga = await this.canAddAudioEntry(userId);
     if(!adauga){
      throw new Error("S-a atins limita maxima de intrari audio specifica abonamentului")
      
     }else{
    return this.prisma.audioEntry.create({
      data: {
        userId,
        fileUrl,
        duration,
      },
    });
  }
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
