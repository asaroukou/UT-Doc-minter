import {
    Controller,
    Get,
    Param,
    Body,
    Put,
    Post,
    Delete,
} from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { User as UserModel, Document as DocumentModel } from '@prisma/client'

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('/')
    async fetchAll(): Promise<UserModel[]> {
        return this.userService.users({})
    }

    @Post('/')
    async createUser(
        @Body() userData: { address: string },
    ): Promise<UserModel> {
        return this.userService.createUser(userData)
    }

}
