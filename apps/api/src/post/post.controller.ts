import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CheckJWT, User } from 'src/auth/guards/jwt.guard';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { UserWithPermissions } from 'src/user/dto/user-with-permissions.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @CheckJWT()
  async create(
    @User() user: UserWithPermissions,
    @Body() createPostDto: CreatePostDto,
  ) {
    const post = await this.postService.create(user.id, createPostDto);

    return new BasicResponseWrapper({ data: post });
  }

  @Get()
  @CheckJWT()
  async findAll(
    @Query('search') search: string,
    @Query('author_id') authorId: string,
    @Query('general_category_id') generalCategoryId: string,
    @Query('public_available') publicAvailable: boolean,
  ) {
    const posts = await this.postService.findAll({
      search,
      authorId,
      generalCategoryId,
      publicAvailable,
    });

    return new BasicResponseWrapper({ data: posts });
  }

  @Get()
  @CheckJWT()
  async findAllPublicallyAvailable(
    @Query('search') search: string,
    @Query('author_id') authorId: string,
    @Query('general_category_id') generalCategoryId: string,
  ) {
    const posts = await this.postService.findAllPublicallyAvailable({
      authorId,
      generalCategoryId,
      search,
    });

    return new BasicResponseWrapper({ data: posts });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postService.findOne(id);

    return new BasicResponseWrapper({ data: post });
  }

  @Patch(':id')
  @CheckJWT()
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postService.update(id, updatePostDto);

    return new BasicResponseWrapper({ data: updatedPost });
  }

  @Patch(':id/toggle-public-availability')
  @CheckJWT()
  async togglePublicAvailability(@Param('id') id: string) {
    const updatedPost = await this.postService.togglePublicAvailability(id);

    return new BasicResponseWrapper({ data: updatedPost });
  }
}
