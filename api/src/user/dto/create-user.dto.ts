import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginDto } from 'src/auth/dto/auth.dto';

export class CreateUserDto extends LoginDto {
  @IsString()
  name: string;
}
