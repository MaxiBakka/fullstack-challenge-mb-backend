import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { MailData } from './interfaces/mail-data.interface';
import { MailerService } from '../mailer/mailer.service';
import path from 'path';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async userSignUp(mailData: MailData): Promise<void> {
    const i18n = I18nContext.current();
    const patientCreationTitle = 'Patient registration';
    let text1 = 'Hey!';
    let text2 = 'You have registered a patient in the system'

    const url = new URL(
      this.configService.getOrThrow('app.frontendDomain', {
        infer: true,
      }) + '/patient-registration',
    );

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: patientCreationTitle,
      text: `${url.toString()} ${patientCreationTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'patient-registration.hbs',
      ),
      context: {
        title: patientCreationTitle,
        url: url.toString(),
        actionTitle: patientCreationTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
      },
    });
  }
}
