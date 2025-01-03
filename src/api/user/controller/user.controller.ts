import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  InternalServerErrorException,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get(":id/membership")
  async getUserMembership(@Param("id") id: string) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new BadRequestException("User ID is invalid.");
    }

    const membership = await this.userService.getUserMembership(userId);
    if (!membership) {
      throw new NotFoundException("Membership not found for this user.");
    }

    return { membership };
  }
  @UseGuards(AuthGuard("jwt"))
  @Get("/id-by-email")
  async getUserIdByEmail(@Query("email") email: string) {
    console.log("Controller: Fetching user ID by email...");
    if (!email) {
      throw new BadRequestException("Email-ul este necesar.");
    }

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException("Utilizatorul nu a fost găsit.");
    }

    return { userId: user.id };
  }
  @UseGuards(AuthGuard("jwt"))
  @Get()
  async findAll() {
    console.log("Controller: Fetching all users...");
    const users = await this.userService.findAll();
    console.log("Controller: Users fetched:", users);
    return { users };
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  async findOne(@Param("id") id: string) {
    console.log("Controller: Fetching one user...");
    const idParsed = parseInt(id, 10);
    if (isNaN(idParsed)) {
      throw new BadRequestException("User ID is invalid.");
    }

    const user = await this.userService.findOne(idParsed);
    if (!user) {
      throw new NotFoundException("User was not found.");
    }

    return { user };
  }

 

  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(
        parseInt(id, 10),
        updateUserDto,
      );
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Error updating user:", error);
      throw new InternalServerErrorException(
        "An error occurred while updating the user.",
      );
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const idParsed = parseInt(id, 10);
    if (isNaN(idParsed)) {
      throw new BadRequestException("User ID is invalid.");
    }

    await this.userService.remove(idParsed);
    return { success: true, message: "User was successfully deleted." };
  }
}
