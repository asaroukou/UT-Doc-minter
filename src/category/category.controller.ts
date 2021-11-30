import {
    Controller,
    Get,
    Param,
    Body,
    Put,
    Post,
    Delete,
} from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { Category as CategoryModel, Document as DocumentModel } from '@prisma/client'

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService){}


    @Get('/')
    async fectchAll(): Promise<CategoryModel[]>{
        return this.categoryService.categories({})
    }

    @Post('/')
    async createCategory(  
        @Body() categoryData : {name: string; description:string;}
    ): Promise<CategoryModel> {
        const { name, description } = categoryData
        return this.categoryService.createCategory({
            name: name,
            description: description
        })
    }
}
