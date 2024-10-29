import { Module } from '@nestjs/common';

import { RelationalPatientPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';

const infrastructurePersistenceModule = RelationalPatientPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService, infrastructurePersistenceModule],
})
export class PatientsModule {}
