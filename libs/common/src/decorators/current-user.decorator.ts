import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../models/user.entity';

type RequestWithUser = Request & { user: User };

const getCurrentUserByContext = (
  context: ExecutionContext,
): User | undefined => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest<RequestWithUser>().user;
  }

  // for graphql
  const request = context.getArgs()[2] as {
    req?: {
      headers?: {
        user?: string;
      };
    };
  };

  const user = request.req?.headers?.user;
  if (user) {
    return JSON.parse(user) as User;
  }
  return undefined;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
