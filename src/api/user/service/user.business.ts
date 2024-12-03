import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../tenants/service/tenant.service';
import { omit } from 'lodash';

@Injectable()
export class UserBusiness {
  constructor(private readonly prisma: PrismaService) {}

  // Verifică dacă utilizatorul există
  async validateUserExistence(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found.`);
    }
    return user;
  }

  // Verifică dacă membership-ul există
  async validateMembershipExistence(membershipId: number) {
    const membership = await this.prisma.membership.findUnique({
      where: { id: membershipId },
    });
    if (!membership) {
      throw new NotFoundException(
        `Membership with ID ${membershipId} was not found.`,
      );
    }
  }

  // Omitere de câmpuri sensibile, precum parola
  sanitizeUser(user: any) {
    return omit(user, ['parola']);
  }
}
