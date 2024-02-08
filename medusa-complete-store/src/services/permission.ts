import { TransactionBaseService } from '@medusajs/medusa';
import { PermissionRepository /* , RoleRepository */ } from '../repositories/index';
import { Permission } from '../models/index';
import { MedusaError } from '@medusajs/utils';

interface PermissionCreateDraft {
  name: string;
  meatadata: {
    [key: string]: boolean;
  };
}

class PermissionService extends TransactionBaseService {
  protected permissionRepository_: typeof PermissionRepository;

  constructor(container) {
    super(container);

    this.permissionRepository_ = container.permissionRepository;
  }

  async create(data: Pick<Permission, 'name' | 'metadata'>): Promise<Permission> {
    return this.atomicPhase_(async (manager) => {
      const permRepo = manager.withRepository(this.permissionRepository_);

      const role = permRepo.create(data);

      if (!role) throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Invalid data');

      const result = await permRepo.save(role);

      return result;
    });
  }
}

export default PermissionService;
