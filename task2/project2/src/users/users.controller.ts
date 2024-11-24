import { Controller, Get, Post, Query } from "@nestjs/common";
import { User } from "@prisma/client";
import { UsersService } from "./users.service";
import { PaginationDto } from "../dto/pagination.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findUsers(@Query() paginationDto: PaginationDto): Promise<User[]> {
    const { page } = paginationDto;
    const limit = 10;
    return this.userService.findUsers(page, limit);
  }

  @Post()
  resetProblemUsers(): Promise<number> {
    return this.userService.resetProblemUsers();
  }
}
