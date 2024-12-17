import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../tenants/service/tenant.service'; 
import { CreateUserMembershipDto } from '../dto/update-user-membership.dto';

@Injectable()
export class UserMembershipService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserSubscriptionDto: CreateUserMembershipDto) {
    const { userId, membershipId } = createUserSubscriptionDto;
    
   console.log(userId)
   console.log(membershipId)
      return await this.prisma.userSubscription.create({
        data: {
          userId,
          membershipId,   
        },
      });
  }
}
