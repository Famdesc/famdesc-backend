import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserCommmand } from "src/core/domain/user/commands/create/create-user.command";
import { PrismaService } from "src/core/services/prisma/prisma.service";
import { UserService } from "src/core/services/user/user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly usersService: UserService,
        private readonly prisma: PrismaService
    ){}
    @Post()
    async create(@Body() data:any) {
            return await this.usersService.create(
                new CreateUserCommmand(data.id, data.email, data.password)
            )
    }
    @Get()
    async findAll() {
    }
}