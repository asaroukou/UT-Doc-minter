import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { DocumentService } from 'src/document/document.service';
import { DocumentController } from 'src/document/document.controller';
import { UserController } from 'src/user/user.controller';
import { CategoryController } from 'src/category/category.controller';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';
import { TagController } from 'src/tag/tag.controller';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    })
  ],
  controllers: [AppController, DocumentController, UserController, CategoryController, TagController, AuthController],
  providers: [AppService, PrismaService, UserService, DocumentService, CategoryService, TagService, AuthService, LocalStrategy, JwtStrategy],
})

export class AppModule { }
