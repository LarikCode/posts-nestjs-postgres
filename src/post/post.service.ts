import { Injectable, HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from "./post.entity";
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
    ) { }

    /***
     * create
     * 
     * @param createInput 
     */
    async create(createInput: Post): Promise<void> {
        console.log(createInput);
        await this.postRepo.save(this.postRepo.create(createInput));
    }

    /**
     * pageInfo
     *
     * @param pageSize 一pageSize
     *  
     * @param  pageIndex pageIndex
     */


    async findOneBypageSize(pageSize: number, pageIndex: number): Promise<Post[]> {
        return await this.postRepo.createQueryBuilder('post').skip((pageIndex-1)*pageSize).take(pageSize)
            .getMany();
    }
    /**
     * findOneById
     *
     * @param id 
     */
    async findOneById(id: number): Promise<Post> {
        return await this.postRepo.findOne(id);
    }
    /**
     * remove(ID)
     *
     * @param id 
     */
    async remove(id: number): Promise<void> {
        const existing = await this.findOneById(id);
        if (!existing) throw new HttpException(`Post，ID '${id}' not exist`, 404);
        await this.postRepo.remove(existing);
    }

    /**
     * update
     *
     * @param id ID
     * @param updateInput updateInput
     */
    async update(id: number, updateInput: Post): Promise<void> {
        const existing = await this.findOneById(id);
        if (!existing) throw new HttpException(`Post，ID '${id}' not exist`, 404);
        if (updateInput.title) existing.title = updateInput.title;
        if (updateInput.content) existing.content = updateInput.content;
        await this.postRepo.save(existing);
    }
}
