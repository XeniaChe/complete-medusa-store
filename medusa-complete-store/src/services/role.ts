import { TransactionBaseService } from '@medusajs/medusa';
import { PermissionRepository, RoleRepository } from '../repositories/index';
import { Role } from '../models/role';
import { MedusaError } from '@medusajs/utils';
import { In } from 'typeorm';

interface RoleCreateDraft {
  name: string;
  permissions?: string[];
}

interface RoleToPermission {
  permissionNames: string[];
  roleId: string;
}

class RoleService extends TransactionBaseService {
  protected roleRepository_: typeof RoleRepository;
  protected permissionRepository_: typeof PermissionRepository;

  constructor(container) {
    super(container);

    this.roleRepository_ = container.roleRepository;
    this.permissionRepository_ = container.permissionRepository;
  }

  async create(data: RoleCreateDraft): Promise<Role> {
    return this.atomicPhase_(async (manager) => {
      const roleRepo = manager.withRepository(this.roleRepository_);
      const permRepo = manager.withRepository(this.permissionRepository_);

      const permissionNames = data.permissions;
      let permissions;
      if (permissionNames) {
        permissions = await permRepo.findBy({ name: In(permissionNames) });

        if (!permissions.length)
          throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            "Permissions with given names don't exist"
          );
      }

      const roleDraft = {
        ...data,
        permissions
      };

      const role = roleRepo.create(roleDraft);

      if (!role) throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Invalid data');

      const result = await roleRepo.save(role);

      return result;
    });
  }

  async addPermission(data: RoleToPermission): Promise<Role> {
    return this.atomicPhase_(async (manager) => {
      const roleRepo = manager.withRepository(this.roleRepository_);
      const permRepo = manager.withRepository(this.permissionRepository_);

      const { permissionNames, roleId } = data;
      const role = await roleRepo.findOne({ where: { id: roleId } });

      if (!role)
        throw new MedusaError(MedusaError.Types.NOT_FOUND, "Role with given id doesn't exist");

      const permissions = await permRepo.findBy({ name: In(permissionNames) });

      if (!permissions.length)
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          "Permissions with given names don't exist"
        );

      const roleDraft = {
        ...role,
        permissions
      };

      const result = await roleRepo.save(roleDraft);
      if (!result) throw new MedusaError(MedusaError.Types.INVALID_DATA, 'Invalid data');

      return result;
    });
  }
}

export default RoleService;
