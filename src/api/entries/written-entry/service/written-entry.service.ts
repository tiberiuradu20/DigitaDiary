import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../tenants/service/tenant.service';


import { UpdateWrittenEntryDto } from '../dto/update-written-entry.dto';

@Injectable()
export class WrittenEntryService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, content: string) {
    console.log('Creating WrittenEntry:', { userId, content });
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
