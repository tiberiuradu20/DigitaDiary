import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../tenants/service/tenant.service';

import { UpdateWrittenEntryDto } from '../dto/update-written-entry.dto';
import { subDays } from 'date-fns';
@Injectable()
export class WrittenEntryService {
  constructor(private prisma: PrismaService) {}

  async canAddWrittenEntry(userId: number): Promise<boolean> {
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
  
    const count = await this.prisma.writtenEntry.count({
      where: {
        userId,
        createdAt: {
          gte: todayStart, // Filtrare pentru intrările create după începutul zilei
        },
      },
    });
  
    // Compară cu limita zilnică
    return count < subscription.membership.nr_maxim_intrari_Scrise;
  }
  

  async create(userId: number, content: string) {
    const canAdd = await this.canAddWrittenEntry(userId);
    console.log('Creating WrittenEntry:', { userId, content });
    if (!canAdd) {
      throw new Error('S-a atins limita zilnica de intrari scrise pentru acest abonament');
    }else{
    try{
    return this.prisma.writtenEntry.create({
      data: {
        userId,
        content,
      },
    });
    }catch(error){
      console.error('Database error:', error);
      throw new Error('Failed to create WrittenEntry');
    }
  }
  }

  async findAllByUser(userId: number) {
    return this.prisma.writtenEntry.findMany({
      where: { userId },
    });
  }

  async deleteById(id: number) {
    return this.prisma.writtenEntry.delete({
      where: { id },
    });
  }

  async update(id: number, updateWrittenEntryDto: UpdateWrittenEntryDto) {
    
    return this.prisma.writtenEntry.update({
      where: { id },
      data: {
        ...updateWrittenEntryDto,
      },
    });
  }
}
