
import { Post } from "./post.entity";
import { Query, Mutation, Resolver, ResolveProperty, Args } from "@nestjs/graphql";
import { PostService } from "./post.service";
import { Result } from '../common/interfaces/result.interface';
import { Injectable, HttpException, Inject ,UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {GqlAuthGuard } from '../common/Guard/GraphqlAuthGuard'
import { from } from "apollo-link";
import {CurrentUser } from "../common/decorator/currentUser"
import { UserEntity } from "../users/users.entity";
import { UsersService } from '../users/users.service';

@Resolver('Post')
export class PostResolver {
    constructor(
        @Inject(PostService) private readonly postsService: PostService,
        @Inject('UsersService') private readonly usersService: UsersService
    ) { }

    @UseGuards(GqlAuthGuard)
    @Mutation('createPost')
    async createPost(@Args('post') post): Promise<Result> {
        console.log(post);
        const user = await this.usersService.findOneById(post.userId);
        post.user = user;
        await this.postsService.create(post);
        return { code: 200, message: 'Succes' }
    }

    @Query('getUserPage')
    async findOneBypageSize(@Args('pageSize') pageSize, @Args('pageSize') pageIndex): Promise<Post[]> {
        console.log(pageIndex);
        return await this.postsService.findOneBypageSize(pageSize, pageIndex);;
    }

}
