import { Module } from '@nestjs/common';
import { MailgunModule } from 'nestjs-mailgun';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          key: process.env.MG_API_KEY,
          username: 'api',
        };
      },
    }),
  ],
  exports: [EmailService],
  providers: [EmailService],
})
export class EmailModule {
  forRoot() {
    return {
      module: EmailModule,
      providers: [EmailService],
      exports: [EmailService],
    };
  }
}
