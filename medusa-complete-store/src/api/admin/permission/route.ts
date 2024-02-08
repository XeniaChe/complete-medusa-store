import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';
import PermissionService from '../../../services/permission';
import { AdminCreatePermissionRequest, Metadata } from './permission-validator';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const permissionService: PermissionService = req.scope.resolve('permissionService');
    const { data } = req.body;

    const toValidateLevel1 = plainToInstance(AdminCreatePermissionRequest, data);
    const toValidateLevel2 = plainToInstance(Metadata, data.metadata);
    toValidateLevel1['metadata'] = toValidateLevel2;

    const errors = await validate(toValidateLevel1);

    if (errors && errors.length) {
      console.log({ errors });
      console.log('error: ' + errors[0].value);
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Validation error');
    }

    const response = await permissionService.create(data);

    res.status(200).json({ data: response });
  } catch (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message);
  }
};
