import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { Crypto } from 'src/auth/crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypt: Crypto,
    private readonly mailerService: MailerService,
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

    try {
      await this.mailerService.sendMail({
        to: newUser.email,
        subject: 'Welcome to the app!',
        template: 'welcome',
        context: {
          name: newUser.name,
          siteName: 'Testing NestJS',
        },
      });
    } catch (error) {
      console.log(error);
    }

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

  static toUser(user: User): UserWithoutPassword {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
