import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { Crypto } from 'src/auth/crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailVerificationService } from './email-verification.service';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypt: Crypto,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (user) throw new ConflictException('Email already exists');

    const hashedPassword = await this.crypt.hash(createUserDto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
        id: randomUUID(),
      },
    });

    await this.emailVerificationService.triggerEmailVerification(newUser.email);

    return UserService.toUser(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return user;
  }

  async search(search: string): Promise<UserWithoutPassword[]> {
    const users = await this.prisma.user.findMany({
      where: {
        name: { contains: search },
        OR: [{ email: { contains: search } }],
      },
    });

    return users.map((user) => UserService.toUser(user));
  }

  async findById(id: string): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return UserService.toUser(user);
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => UserService.toUser(user));
  }

  async updateAvatar(id: string, avatar: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { avatar },
    });
  }

  async updateName(id: string, name: string): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { name } });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { password: await this.crypt.hash(password) },
    });
  }

  async updateEmail(id: string, email: string): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { email } });
  }

  async updateVerified(id: string, verified: boolean): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { verified } });
  }

  static toUser(user: User): UserWithoutPassword {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      verified: user.verified,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
