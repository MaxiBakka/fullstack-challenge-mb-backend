import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
// decorators here
IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class CreatePatientDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail({host_whitelist: ['gmail.com']})
  email: string | null;

  @ApiProperty({ example: '59898105543', type: String })
  @IsPhoneNumber(undefined)
  phoneNumber: string | null;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  lastName: string | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;
}
