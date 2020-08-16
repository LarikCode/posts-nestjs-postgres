import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../users/users.entity';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: 'text'
    })
    content: string;

    // @ManyToOne and onDelete method
    @ManyToOne(type => UserEntity, user => user.posts, {
        onDelete: 'CASCADE'
    })
    user: UserEntity;
}