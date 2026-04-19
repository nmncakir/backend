import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export type MailPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

@Injectable()
export class EmailDispatchService {
  private readonly logger = new Logger(EmailDispatchService.name);
  private readonly mailgunDomain: string;
  private readonly mailgunClient;

  constructor(private readonly config: ConfigService) {
    const key = this.config.getOrThrow<string>('MAILGUN_API_KEY');
    const fromEmail = this.config.getOrThrow<string>('MAILGUN_FROM_EMAIL');
    const configuredDomain = this.config.get<string>('MAILGUN_DOMAIN');

    this.mailgunDomain = configuredDomain ?? this.extractDomain(fromEmail);

    const mailgun = new Mailgun(formData);
    this.mailgunClient = mailgun.client({
      username: 'api',
      key,
      url: 'https://api.eu.mailgun.net'
    });
  }

  async send(payload: MailPayload): Promise<void> {
    const from = this.config.getOrThrow<string>('MAILGUN_FROM_EMAIL');

    const message = {
      from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text?.trim() ? payload.text : undefined,
      html: payload.html?.trim() ? payload.html : undefined,
    };

    if (!message.text && !message.html) {
      message.text = '';
    }

    await this.mailgunClient.messages.create(this.mailgunDomain, message);
    this.logger.debug(`Mailgun mail sent to ${payload.to}`);
  }

  private extractDomain(email: string): string {
    const atIndex = email.lastIndexOf('@');
    if (atIndex === -1 || atIndex === email.length - 1) {
      throw new Error('MAILGUN_FROM_EMAIL must be a valid email address');
    }

    return email.slice(atIndex + 1);
  }
}
