import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { MembershipService } from "../service/membership.service";
import { CreateMembershipDto } from "../dto/create-membership.dto";
import { UpdateMembershipDto } from "../dto/update-membership.dto";

@Controller("memberships")
export class MembershipController {
  constructor(private readonly membershipService:MembershipService) {}

  @Get()
  async findAll() {
    const memberships = await this.membershipService.findAll();
    return { memberships };
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const idParsed = parseInt(id, 10);
    if (isNaN(idParsed)) {
      throw new BadRequestException("Invalid membership ID.");
    }

    const membership = await this.membershipService.findOne(idParsed);
    return { membership };
  }

  @Post()
  async create(@Body() createMembershipDto: CreateMembershipDto) {
    const membership = await this.membershipService.create(
      createMembershipDto,
    );
    return {
      success: true,
      message: "Membership created successfully",
      membership,
    };
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    const idParsed = parseInt(id, 10);
    if (isNaN(idParsed)) {
      throw new BadRequestException("Invalid membership ID.");
    }

    const membership = await this.membershipService.update(
      idParsed,
      updateMembershipDto,
    );
    return {
      success: true,
      message: "Membership updated successfully",
      membership,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const idParsed = parseInt(id, 10);
    if (isNaN(idParsed)) {
      throw new BadRequestException("Invalid membership.");
    }

    await this.membershipService.remove(idParsed);
    return { success: true, message: "Membership deleted successfully" };
  }
}
