import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // await createUser(req, res);
    res.json({ message: 'Check' });
  } catch (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message);
  }
};
