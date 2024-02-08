import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';
import RoleService from '../../../services/role';
import { AdminCreateRoleRequest } from './role-validator';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const roleService: RoleService = req.scope.resolve('roleService');
    const { data } = req.body;

    const toValidate = plainToInstance(AdminCreateRoleRequest, data);
    const errors = await validate(toValidate);

    if (errors && errors.length) {
      console.log({ errors });
      console.log('error: ' + errors[0].value);
      throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Validation error');
    }
    const response = await roleService.create(data);

    res.status(200).json({ data: response });
  } catch (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message);
  }
};

export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const roleService: RoleService = req.scope.resolve('roleService');
    const { data } = req.body;
    const response = await roleService.addPermission(data);

    res.status(200).json({ data: response });
  } catch (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.message);
  }
};
