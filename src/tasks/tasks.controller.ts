import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TasksDto } from './tasks.dto';

@Controller('user/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.tasksService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: TasksDto, @CurrentUser('id') userId: string) {
    return this.tasksService.create(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: TasksDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.tasksService.update(dto, id, userId);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
