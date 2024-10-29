import { Module } from '@nestjs/common';

import { RelationalPatientPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { MailModule } from '../mail/mail.module';

const infrastructurePersistenceModule = RelationalPatientPersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    FilesModule,
    MailModule
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService, infrastructurePersistenceModule],
})
export class PatientsModule {}
