import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { CreateMembershipDto } from "../dto/create-membership.dto";
import { UpdateMembershipDto } from "../dto/update-membership.dto";

@Injectable()
export class MembershipService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.membership.findMany();
  }

  async findOne(id: number) {
    const membership = await this.prisma.membership.findUnique({
      where: { id },
    });

    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found.`);
    }

    return membership;
  }

  async create(createMembershipDto: CreateMembershipDto) {
    return this.prisma.membership.create({
      data: createMembershipDto,
    });
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto) {
    const membership= await this.prisma.membership.findUnique({
      where: { id },
    });

    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found.`);
    }

    return this.prisma.membership.update({
      where: { id },
      data: updateMembershipDto,
    });
  }

  async remove(id: number) {
    const membership = await this.prisma.membership.findUnique({
      where: { id },
    });

    if (!membership) {
      throw new NotFoundException(`Membership with ID ${id} not found.`);
    }

    return this.prisma.membership.delete({
      where: { id },
    });
  }
}
