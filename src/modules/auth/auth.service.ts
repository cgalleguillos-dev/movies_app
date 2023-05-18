import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { LoginInput } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async login(loginInput: LoginInput) {
        const user = await this.userRepository.findOne({
            where: {
                email: loginInput.email
            }

        });
        if (!user) {
            throw new Error('Invalid Credentials');
        }
        if (!user.validatePassword(loginInput.password)) {
            throw new Error('Invalid Credentials');
        }
        console.log(process.env.JWT_SECRET)
        const token = this.jwtService.sign(user.getInfoToToken(), { expiresIn: '1d', secret: process.env.JWT_SECRET });
        return {
            token: token,
            user: user
        }
    }

    async refreshToken(token: string): Promise<any> {
        const user = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        const newToken = this.jwtService.sign(user, { expiresIn: '1d', secret: process.env.JWT_SECRET });
        return {
            token: newToken,
            user: user
        }
    }
}
