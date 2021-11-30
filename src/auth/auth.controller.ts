import { Controller, Post, Get, Body, HttpException, HttpStatus, Query, Param, UseGuards, Request } from '@nestjs/common';
import Web3 from 'web3'
import { AuthService } from 'src/auth/auth.service'
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('')
    async verifySignature(
        @Body() body: { signature: string; address: string; }
    ): Promise<String> {
        const { signature, address } = body
        const res = await this.authService.validateUser(address, signature)

        return res
    }

    @Get('nonce/:address')
    async requireLogin(
        @Param('address') address
    ): Promise<String> {
        const res = await this.authService.requireLoginNonce(address)
        if (!res) {
            throw new HttpException('user nonce fetch error', HttpStatus.NOT_FOUND);
        }
        return res
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
