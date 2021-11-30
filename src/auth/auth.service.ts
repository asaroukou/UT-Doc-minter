import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import Web3 from 'web3'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {

    private web3: Web3

    constructor(private userService: UserService, private jwtService: JwtService) {
        this.web3 = new Web3
    }



    async validateUser(publicAddress: string, signature: string): Promise<any> {
        const user = await this.userService.user({
            address: publicAddress
        })
        if (user) {
            const nonce = user.nonce
            const recoveredSignatoryAddress = this.web3.eth.accounts.recover(nonce, signature)
            if (recoveredSignatoryAddress === user.address) {
                return user
            } else {
                return null
            }
        }
        return null
    }

    async login(user: User) {
        const payload = { address: user.address, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async requireLoginNonce(address) {
        const user = await this.userService.user({
            address: address
        })
        if(user){
            const nonce = this.updateUserNonce(user)
            return nonce
        }else{
            const user = await this.userService.createUser({
                address: address,
                nonce: uuidv4()
            })
            return user.nonce
        }
        return null
    }


    async updateUserNonce(user:User) : Promise<String> {
        const updatedUser = await this.userService.updateUser({
            where:{address: user.address},
            data:{nonce: uuidv4()}
        })
        return updatedUser.nonce
    }

}
