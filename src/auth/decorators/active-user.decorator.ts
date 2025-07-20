import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import type { ActiveUserData } from '../interfaces/active-user-data.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: ActiveUserData }>();

    const user: ActiveUserData = request[REQUEST_USER_KEY];

    return field ? user?.[field] : user;
  },
);
