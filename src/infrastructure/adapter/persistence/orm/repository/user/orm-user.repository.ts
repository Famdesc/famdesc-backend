import { User } from 'src/core/domain/user/models/user';
import { UserRepositoryPort } from '../../../../../../core/domain/user/ports/persistence/user-repository.port';
import { UserMapper } from '../../mappers/user/user.mapper';
import { PrismaService } from 'src/core/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Optional } from 'src/core/common/types/common.types';

@Injectable()
export class OrmUserRepository implements UserRepositoryPort {
    constructor(
        private readonly prisma: PrismaService
    ){}
    public async save(user: User): Promise<User> {
        const data = UserMapper.toPersistence(user)
        const newUser = await this.prisma.user.create({
            data,
        })
        return UserMapper.toDomain(newUser)
    }
    public async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map((item) => UserMapper.toDomain(item))
    }
    public async findOne(user: Prisma.UserWhereUniqueInput) {
        let domainUser: Optional<User>;
        const ormUser= await this.prisma.user.findUnique({
            where: user
        })
        if(ormUser) {
            domainUser = UserMapper.toDomain(ormUser)
        }
        return domainUser
    }
}