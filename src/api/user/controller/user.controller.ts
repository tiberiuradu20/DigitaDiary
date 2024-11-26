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
  UseGuards,
} from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

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
