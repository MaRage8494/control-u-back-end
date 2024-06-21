import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { PomodoroTimerModule } from './pomodoro-timer/pomodoro-timer.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, TasksModule, TimeBlockModule, PomodoroTimerModule],
})
export class AppModule {}
