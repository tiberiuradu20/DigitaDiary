import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  
  @Injectable()
  export class OptionsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
  
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header(
          'Access-Control-Allow-Methods',
          'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        );
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type',
        );
        res.status(204).send(); // Trimite un răspuns fără conținut
      }
  
      return next.handle();
    }
  }
  