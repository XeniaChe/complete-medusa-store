import type {
  MiddlewaresConfig,
  User,
  UserService,
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse
} from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';

const registerLoggedInUser = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  let loggedInUser: User | null = null;

  if (req.user && req.user.userId) {
    const userService = req.scope.resolve('userService') as UserService;
    loggedInUser = await userService.retrieve(req.user.userId);
  }

  req.scope.register({
    loggedInUser: {
      resolve: () => loggedInUser
    }
  });

  next();
};

export const permissions = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  try {
    if (!req.user || !req.user.userId) {
      // next();
      // return;
      // deny access
      throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "You're Unauthorized");
    }
    // retrieve currently logged-in user
    const userService = req.scope.resolve('userService') as UserService;
    const loggedInUser = await userService.retrieve(req.user.userId, {
      select: ['id'],
      relations: ['teamRole', 'teamRole.permissions']
    });

    if (!loggedInUser.teamRole) {
      // considered as super user
      // next();
      // return;
      // deny access
      throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "You're Unauthorized");
    }

    const isAllowed = loggedInUser.teamRole?.permissions.some((permission) => {
      const metadataKey = Object.keys(permission.metadata).find((key) => key === req.path);
      if (!metadataKey) {
        return false;
      }

      // boolean value
      return permission.metadata[metadataKey];
    });

    if (isAllowed) {
      next();
      return;
    }

    // deny access
    res.sendStatus(401);
  } catch (error) {
    res.send({ message: error.message });
  }
};

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: '/admin/user',
      middlewares: [registerLoggedInUser]
    },
    {
      matcher: '/admin/user',
      method: 'GET', // For test only
      middlewares: [permissions]
    }
  ]
};
