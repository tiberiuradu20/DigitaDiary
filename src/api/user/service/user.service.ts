import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../tenants/service/tenant.service';
import { UserBusiness } from './user.business';
import { UpdateUserDto } from '../dto/update-user.dto';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userBusiness: UserBusiness,
  ) {}

  async findAll() {
    const users = await this.prisma.user.findMany();
    // Utilizează Business Layer-ul pentru logica suplimentară
    return users.map((user) => this.userBusiness.sanitizeUser(user));
  }

  async findOne(id: number) {
    // Validează și returnează utilizatorul utilizând Business Layer-ul
    const user = await this.userBusiness.validateUserExistence(id);
    return this.userBusiness.sanitizeUser(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Validează utilizatorul și membership-ul folosind Business Layer-ul
    const user = await this.userBusiness.validateUserExistence(id);
    const { membershipId, ...data } = updateUserDto;

    if (membershipId) {
      await this.userBusiness.validateMembershipExistence(membershipId);
    }

    // Actualizează datele utilizatorului
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      
      },
    });
  }

  async remove(id: number) {
    // Validează existența utilizatorului și apoi șterge-l
    await this.userBusiness.validateUserExistence(id);
    await this.prisma.user.delete({ where: { id } });
  }
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException("Utilizatorul nu a fost găsit.");
    }

    return user;
  }

  async getUserMembership(userId: number) {
    const subscription = await this.prisma.userSubscription.findFirst({
      where: { userId },
      include: {
        membership: true, // Include detaliile despre membership
      },
    });
    console.log("Fetching membership for user ID:", userId);
    if (!subscription) {
      throw new NotFoundException("User does not have an active subscription.");
    }
  
    return {
      membershipType: subscription.membership.tipMembership,
      maxWrittenEntries: subscription.membership.nr_maxim_intrari_Scrise,
      maxAudioEntries: subscription.membership.nr_maxim_intrari_Audio,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    };
  }
  


}
