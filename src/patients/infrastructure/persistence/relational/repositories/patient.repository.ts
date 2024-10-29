import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { PatientEntity } from '../entities/Patient.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Patient } from '../../../../domain/patient';
import { PatientRepository } from '../../patient.repository';
import { PatientMapper } from '../mappers/patient.mapper';

@Injectable()
export class PatientsRelationalRepository implements PatientRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientsRepository: Repository<PatientEntity>,
  ) {}

  async create(data: Patient): Promise<Patient> {
    const persistenceModel = PatientMapper.toPersistence(data);
    const newEntity = await this.patientsRepository.save(
      this.patientsRepository.create(persistenceModel),
    );
    return PatientMapper.toDomain(newEntity);
  }


  async findById(id: Patient['id']): Promise<NullableType<Patient>> {
    const entity = await this.patientsRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? PatientMapper.toDomain(entity) : null;
  }

  async findByEmail(email: Patient['email']): Promise<NullableType<Patient>> {
    if (!email) return null;

    const entity = await this.patientsRepository.findOne({
      where: { email },
    });

    return entity ? PatientMapper.toDomain(entity) : null;
  }
}
