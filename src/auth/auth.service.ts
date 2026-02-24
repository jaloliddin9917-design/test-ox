import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.user.upsert({
      where: { email },
      update: { otp },
      create: { email, otp },
    });

    return { otp, message: 'OTP generated' };
  }

  async verify(email: string, otp: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.otp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    await this.prisma.user.update({
      where: { email },
      data: { otp: null },
    });

    const token = this.jwtService.sign({ sub: user.id, role: user.role });

    return { token };
  }
}
