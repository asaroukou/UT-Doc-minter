import {
    Controller,
    Get,
    Param,
    Body,
    Put,
    Post,
    Delete,
    UseGuards,
    Request,
    Query,
} from '@nestjs/common'
import { User as UserModel, Document as DocumentModel, Prisma } from '@prisma/client'
import { DocumentService } from 'src/document/document.service'
import { CategoryService } from 'src/category/category.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'


@Controller('document')
export class DocumentController {

    constructor(private readonly documentService: DocumentService, private readonly categoryService: CategoryService) {}

    @Get('/')
    async getPublishedDocuments(): Promise<DocumentModel[]> {
        return this.documentService.documents({})
    }

    @Get('/filter')
    async filterPublishedDocuments(
        @Query('author') author:string,
        @Query('category') category:string,
    ): Promise<DocumentModel[]> {
        let searchQuery = {}
        if(author){
            searchQuery = {...searchQuery, authorAddress: author}
        }
        if(category){
            searchQuery = {...searchQuery, categoryId: parseInt(category)}
        }
        return this.documentService.documents({
            where: searchQuery
        })
    }
    @Get('/:id')
    async getDocumentById(@Param('id') id: string): Promise<DocumentModel> {
        return this.documentService.document({ id: Number(id) })
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async create(
        @Body() documentData: { mime: string; hash?: string; authorAddress: string; description:string; name:string; category:number; tags:number[] },
        @Request() req,
    ): Promise<DocumentModel> {
        const { mime, hash, description, category, tags, name } = documentData
        const url = ''
        const tagsConnect: Prisma.Enumerable<Prisma.TagWhereUniqueInput> = tags.map( tagId => ({id: tagId}))
        return this.documentService.createDocument({
            hash: hash,
            mime: mime,
            url: url,
            name: name,
            description: description,
            category: {
                connect: {id: category}
            },
            tags:{
                connect: tagsConnect
            },
            author: {
                connect: { address: req.user.address },
            },
        })
    }

    @Delete('/:id')
    async deleteDocument(@Param('id') id: string): Promise<DocumentModel> {
        return this.documentService.deleteDocument({ id: Number(id) })
    }

}
