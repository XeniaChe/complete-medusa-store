import { IsString, IsArray, IsOptional } from 'class-validator';

export class AdminCreateRoleRequest {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions: string[];

  @IsOptional()
  @IsString()
  store_id: string;
}
