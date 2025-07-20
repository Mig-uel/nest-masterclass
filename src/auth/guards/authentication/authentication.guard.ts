import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]>;
  private static readonly defaultAuthType = AuthType.Bearer;

  /**
   * Injects Reflector and AccessTokenGuard
   */
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: {
        canActivate: () => true,
      },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get all authTypes set by Auth our decorator from Reflector
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    // Create array of all guards
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();

    // Loop through each of the guards and fire the canActivate methods
    for (const instance of guards) {
      const canActivate = await Promise.resolve(instance.canActivate(context));

      if (canActivate) return true;
    }

    throw new UnauthorizedException();
  }
}
