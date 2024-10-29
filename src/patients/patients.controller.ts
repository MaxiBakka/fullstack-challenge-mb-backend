import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Patient } from './domain/patient';
import { PatientsService } from './patients.service';

@ApiTags('Patients')
@Controller({
  path: 'patients',
  version: '1',
})
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiCreatedResponse({
    type: Patient,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.create(createProfileDto);
  }

}
