import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BanModule } from './ban/ban.module';
import { EmailModule } from './email/email.module';
import { GeneralCategoryModule } from './general-category/general-category.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';
import { SimulationCategoryModule } from './simulation-category/simulation-category.module';
import { SimulationPhaseModule } from './simulation-phase/simulation-phase.module';
import { SimulationModule } from './simulation/simulation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env.production'],
    }),
    UserModule,
    AuthModule,
    GeneralCategoryModule,
    SimulationCategoryModule,
    PostModule,
    BanModule,
    SimulationModule,
    SimulationPhaseModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}