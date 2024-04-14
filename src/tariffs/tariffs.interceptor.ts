import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TimeHelper } from '../helpers/time.helper';

@Injectable()
export class TariffsTimeSliceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.body.startAt) {
      request.body.startAt = TimeHelper.getSecondsFromTime(
        request.body.startAt,
      );
    }

    if (request.body.endAt) {
      request.body.endAt = TimeHelper.getSecondsFromTime(request.body.endAt);
    }

    return next.handle();
  }
}
