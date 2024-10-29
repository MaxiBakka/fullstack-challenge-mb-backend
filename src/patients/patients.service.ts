import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { PatientRepository } from './infrastructure/persistence/patient.repository';
import { Patient } from './domain/patient';
import { FilesService } from '../files/files.service';
import { FileType } from '../files/domain/file';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientsRepository: PatientRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // Do not remove comment below.
    // <creating-property />

    let email: string = '';

    if (createPatientDto.email) {
      const patientObject = await this.patientsRepository.findByEmail(
        createPatientDto.email,
      );
      if (patientObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
      email = createPatientDto.email;
    }

    let photo: FileType | null | undefined = undefined;

    if (createPatientDto.photo?.id) {
      const fileObject = await this.filesService.findById(
        createPatientDto.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (createPatientDto.photo === null) {
      photo = null;
    }

    return this.patientsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      firstName: createPatientDto.firstName,
      lastName: createPatientDto.lastName,
      phoneNumber: createPatientDto.phoneNumber,
      email: email,
      photo: photo,
    });
  }

  findById(id: Patient['id']): Promise<NullableType<Patient>> {
    return this.patientsRepository.findById(id);
  }
}
