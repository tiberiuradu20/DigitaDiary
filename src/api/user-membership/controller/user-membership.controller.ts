import { 
  Body,
  Controller,
  Post, 
} from "@nestjs/common";
import { CreateUserMembershipDto } from "../dto/update-user-membership.dto"; 
import { UserMembershipService } from "../service/user-membership.business";

@Controller("users-subscription")
export class UserMembershipController {
  constructor(private readonly userMembershipService: UserMembershipService) {}
 

   
  @Post()
  create(@Body() createUserMembershipDto: CreateUserMembershipDto) {
    console.log(createUserMembershipDto.membershipId);
     
    return this.userMembershipService.create(createUserMembershipDto);
  }

   
}
