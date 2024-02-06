// import 'reflect-metadata';
import { User as MedusaUser, Store } from '@medusajs/medusa';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './role';

@Entity()
export class User extends MedusaUser {
  @Index('UserStoreId')
  @Column({ nullable: true })
  store_id?: string;

  @ManyToOne(() => Store, (store) => store.members)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: Store;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  teamRole: Role | null;

  @Index()
  @Column({ nullable: true })
  role_id: string | null;
}
