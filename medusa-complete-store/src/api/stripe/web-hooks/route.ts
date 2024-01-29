import { MedusaRequest, MedusaResponse, EventBusService } from '@medusajs/medusa';

export async function POST(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  const evBusService: EventBusService = req.scope.resolve('eventBusService');
  const event = req.body;

  evBusService.emit(`stripe-${event.type}`, { data: event.data });

  // type:charge.succeeded
  // payment_intent.succeeded
  res.sendStatus(200);
}

export async function GET(req: MedusaRequest, res: MedusaResponse): Promise<void> {
  res.sendStatus(200).send('OK');
}
