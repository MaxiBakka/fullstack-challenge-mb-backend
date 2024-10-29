import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PatientDto {
  @ApiProperty({
    type: String,
    example: 'patientId',
  })
  @IsNotEmpty()
  id: string | number;
}
