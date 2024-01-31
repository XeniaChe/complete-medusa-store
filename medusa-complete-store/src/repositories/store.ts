// TODO: bring back after fixed:
// Error starting server. DataTypeNotSupportedError: Data type "Array" in "Store.members" is not supported by "postgres" database.

/* import { Store } from '@medusajs/medusa';
import { dataSource } from '@medusajs/medusa/dist/loaders/database';
import { StoreRepository as MedusaStoreRepository } from '@medusajs/medusa/dist/repositories/store';

export const StoreRepository = dataSource.getRepository(Store).extend({
  ...Object.assign(MedusaStoreRepository, { target: Store })
});

export default StoreRepository;
 */
