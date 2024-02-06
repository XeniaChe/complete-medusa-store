import { Store as MedusaStore, User } from '@medusajs/medusa';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Role } from './role';

@Entity()
export class Store extends MedusaStore {
  @OneToMany(() => Role, (role) => role.store)
  @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  roles: Role[];
}
