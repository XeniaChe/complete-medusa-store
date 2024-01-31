import { User as MedusaUser, Store } from '@medusajs/medusa';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class User extends MedusaUser {
  @Index('UserStoreId')
  @Column({ nullable: true })
  store_id?: string;

  @ManyToOne(() => Store, (store) => store.members)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store: Store;
}
