import { AdminCreateUserRequest as MedusaAdminCreateUserRequest } from '@medusajs/medusa/dist/api/routes/admin/users/create-user';
import { IsString } from 'class-validator';

export class AdminCreateUserRequest extends MedusaAdminCreateUserRequest {
  @IsString()
  store_id: string;
  @IsString()
  role_id: string;
}
