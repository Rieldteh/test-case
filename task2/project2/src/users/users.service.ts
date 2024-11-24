import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUsers(page: number, limit: number): Promise<User[]> {
    page = Math.max(page, 1);
    limit = Math.max(limit, 1);
    const offset = (page - 1) * limit;

    const [users] = await Promise.all([
      this.prisma.user.findMany({
        skip: offset,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    return users;
  }

  async resetProblemUsers(): Promise<number> {
    const updUsers = await this.prisma.user.updateMany({
      where: {
        hasIssues: true,
      },
      data: {
        hasIssues: false,
      },
    });

    return updUsers.count;
  }
}
