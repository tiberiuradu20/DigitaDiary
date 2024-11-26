import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({});

    return users.map((user) => omit(user, ['parola']));  
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found.`);
    }
    const userWithoutPassword = omit(user, "parola");
    return userWithoutPassword;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found.`);
    }

    const { membershipId, ...data } = updateUserDto;

    if (membershipId) {
      const membership = await this.prisma.membership.findUnique({
        where: { id: membershipId },
      });

      if (!membership) {
        throw new NotFoundException(
          `Subscription with ID ${membershipId} was not found.`,
        );
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        Membership: membershipId
          ? { connect: { id: membershipId} }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found.`);
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
