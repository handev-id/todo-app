import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

const USER_IDS = ['user1', 'user2', 'user3']; // must be replaced with real user validation logic

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userId = req.headers['x-user-id'];

    if (!userId) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (!USER_IDS.includes(userId)) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
