import { registerOverriddenValidators } from '@medusajs/medusa';
import { AdminCreateUserRequest } from './admin/user/user-validator';

registerOverriddenValidators(AdminCreateUserRequest);
