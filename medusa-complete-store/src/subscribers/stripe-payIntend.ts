import { type SubscriberConfig, type SubscriberArgs } from '@medusajs/medusa';
import * as SG from 'medusa-plugin-sendgrid';

export default async function handleStripePayIntedSuccess({
  data,
  eventName,
  container,
  pluginOptions
}: SubscriberArgs<Record<string, string>>) {
  try {
    const sendGrid = container.resolve('sendgridService');

    const sendOptions = {
      templateId: 'd-87e0e6cd8d764d309680a944ce837713',
      from: 'xenia.cserkun@cloudflight.io',
      to: 'xeniacserkun@gmail.com',
      subject: 'test',
      dynamic_template_data: { dynamic: data.data }
    };
    await sendGrid.sendEmail(sendOptions);
  } catch (error) {
    console.error(error);
  }
}

export const config: SubscriberConfig = {
  event: 'stripe-payment_intent.succeeded',
  context: {
    subscriberId: 'stripe-payInted-success'
  }
};
