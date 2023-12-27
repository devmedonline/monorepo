import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BanModule } from './ban/ban.module';
import { ReactAdapter } from './email/adapters/react.adapter';
import { GeneralCategoryModule } from './general-category/general-category.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';
import { SimulationCategoryModule } from './simulation-category/simulation-category.module';
import { SimulationPhaseModule } from './simulation-phase/simulation-phase.module';
import { SimulationModule } from './simulation/simulation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    GeneralCategoryModule,
    SimulationCategoryModule,
    PostModule,
    BanModule,
    SimulationModule,
    SimulationPhaseModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SITE_EMAIL,
      },
      template: {
        dir: __dirname + '/email/templates',
        adapter: new ReactAdapter(),
        options: { strict: true },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
