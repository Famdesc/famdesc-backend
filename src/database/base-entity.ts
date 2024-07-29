import { IsUUID } from 'class-validator';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {

    @IsUUID()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({
        nullable: true,
        type: 'timestamptz'
    })
    deletedAt: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}