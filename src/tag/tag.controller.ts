import {
    Controller,
    Get,
    Param,
    Body,
    Put,
    Post,
    Delete,
} from '@nestjs/common'
import { TagService } from 'src/tag/tag.service'
import { Tag as TagModel, Document as DocumentModel } from '@prisma/client'

@Controller('tag')
export class TagController {

    constructor(private readonly tagService: TagService){}


    @Get('/')
    async fectchAll(): Promise<TagModel[]>{
        return this.tagService.tags({})
    }

    @Post('/')
    async createTag(  
        @Body() tagData : {name: string}
    ): Promise<TagModel> {
        const { name } = tagData
        return this.tagService.createTag({
            name: name
        })
    }
}
