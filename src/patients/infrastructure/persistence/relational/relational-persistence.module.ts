import { Module } from '@nestjs/common';
import { PatientRepository } from '../patient.repository';
import { PatientsRelationalRepository } from './repositories/patient.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  providers: [
    {
      provide: PatientRepository,
      useClass: PatientsRelationalRepository,
    },
  ],
  exports: [PatientRepository],
})
export class RelationalPatientPersistenceModule {}
