import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../tenants/service/tenant.service";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";

import { ValidateUserDto } from "../dto/validate-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(validateUserDto: ValidateUserDto) {
    const { email, parola} = validateUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const parolaValida = await bcrypt.compare(parola, user.parola);
    if (!parolaValida) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, parola, nume, prenume } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException("Email-ul este deja folosit");
    }

    const parolaHash = await bcrypt.hash(parola, 10);
    return this.prisma.user.create({
      data: {
        nume,
        prenume,
        email,
        parola: parolaHash
      },
    });
  }
}
