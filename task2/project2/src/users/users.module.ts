import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AppModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
