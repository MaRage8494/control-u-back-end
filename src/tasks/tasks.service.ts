import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TasksDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async getStatistics(id: string, todayStart: Date, weekStart: Date) {
    const completedTasks = await this.prisma.task.count({
      where: {
        userId: id,
        isCompleted: true,
      },
    });

    const todayTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: todayStart.toISOString(),
        },
      },
    });

    const weekTasks = await this.prisma.task.count({
      where: {
        userId: id,
        createdAt: {
          gte: weekStart.toISOString(),
        },
      },
    });

    return { completedTasks, todayTasks, weekTasks };
  }

  async getAll(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async create(dto: TasksDto, userId: string) {
    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(dto: Partial<TasksDto>, taskId: string, userId: string) {
    return this.prisma.task.update({
      where: {
        userId,
        id: taskId,
      },
      data: dto,
    });
  }
  async delete(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
