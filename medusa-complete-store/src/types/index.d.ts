import { Role } from '../models/role';

export declare module '@medusajs/medusa/dist/models/store' {
  declare interface Store {
    members: User[];
    roles: Role[];
  }
}

export declare module '@medusajs/medusa/dist/models/user' {
  declare interface User {
    store_id?: string;
    store: Store;
    teamRole: Role | null;
    role_id: string | null;
  }

  declare interface Store {
    roles: Role[];
  }
}
