import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from './user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}), PrismaModule, CqrsModule.forRoot(), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
