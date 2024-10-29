import { NullableType } from '../../../utils/types/nullable.type';
import { Patient } from '../../domain/patient';

export abstract class PatientRepository {
  abstract create(
    data: Omit<Patient, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Patient>;


  abstract findById(id: Patient['id']): Promise<NullableType<Patient>>;
  abstract findByEmail(email: Patient['email']): Promise<NullableType<Patient>>;
}
