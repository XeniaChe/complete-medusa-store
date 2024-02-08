import { IsString, ValidateNested, IsObject, IsBoolean } from 'class-validator';

// TODO find way to validate keys as well
export class Metadata {
  @IsBoolean()
  key: boolean;
  // [key: string]: boolean;
}

export class AdminCreatePermissionRequest {
  @IsString()
  name: string;

  @ValidateNested()
  @IsObject()
  metadata: Metadata;
}
