import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Patient } from './domain/patient';
import { PatientsService } from './patients.service';
import { MailService } from '../mail/mail.service';

@ApiTags('Patients')
@Controller({
  path: 'patients',
  version: '1',
})
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private mailService: MailService) {}

  @ApiCreatedResponse({
    type: Patient,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProfileDto: CreatePatientDto): Promise<Patient> {
    const patientDto = await this.patientsService.create(createProfileDto);
    await this.mailService.sendPatientRegistrationEmail({ to: patientDto.email });
    return patientDto
  }

}
