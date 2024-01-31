import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';

import createUser from '@medusajs/medusa/dist/api/routes/admin/users/create-user';
import listUsers from '@medusajs/medusa/dist/api/routes/admin/users/list-users';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    await createUser(req, res);
  } catch (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message);
  }
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    await listUsers(req, res);
  } catch (error) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, error.message);
  }
};
