import { User } from 'src/core/domain/user/user';
import { UserRepositoryPort } from '../../../../../../core/domain/user/ports/persistence/user-repository.port';
import { UserMapper } from '../../mappers/user/user.mapper';
import { PrismaService } from 'src/core/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmUserRepository implements UserRepositoryPort {
    constructor(
        private readonly prisma: PrismaService
    ){}
    async save(user: User): Promise<User> {
        const data = UserMapper.toPersistence(user)
        const newUser = await this.prisma.user.create({
            data,
        })
        return UserMapper.toDomain(newUser)
    }
    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map((item) => UserMapper.toDomain(item))
    }
}