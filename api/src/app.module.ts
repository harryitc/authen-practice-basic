import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard, AuthModule } from '@modules/auth';
import { UsersModule } from '@modules/users';

@Module({
  imports: [
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
