import { UnauthorizedException } from '@nestjs/common';
import { app } from './app';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE, User } from '@app/common';
import { lastValueFrom } from 'rxjs';

type AuthContextParams = {
  req: {
    headers?: {
      authentication?: string;
    };
  };
};

export const authContext = async ({ req }: AuthContextParams) => {
  try {
    const authClient = app.get<ClientProxy>(AUTH_SERVICE);
    const user = await lastValueFrom(
      authClient.send<User>('authenticate', {
        Authentication: req.headers?.authentication,
      }),
    );

    return { user };
  } catch (err) {
    throw new UnauthorizedException(err);
  }
};
