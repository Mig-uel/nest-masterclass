import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import AppConfig from 'src/config/app.config';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>,
  ) {}

  intercept<T>(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    apiVersion: string | undefined;
    data: T;
  }> {
    return next.handle().pipe(
      map((data: T) => ({
        apiVersion: this.appConfig.apiVersion,
        data,
      })),
    );
  }
}
