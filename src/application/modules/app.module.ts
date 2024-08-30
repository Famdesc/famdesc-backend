import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from './infrastructure.module';
import { UserModule } from './user.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    InfrastructureModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
