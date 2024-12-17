  
  import { IsNumber } from "class-validator"; 
  
  export class CreateUserMembershipDto {
    @IsNumber()
    userId: number;
  
    @IsNumber()
    membershipId: number;
  }