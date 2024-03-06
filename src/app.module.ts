import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ClientModule, PrismaModule],
  exports: [],
})
export class AppModule {}
