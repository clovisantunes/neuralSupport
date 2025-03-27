import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAdminModule } from './Modules/Clients/Clients.module';

@Module({
  imports: [UserAdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
