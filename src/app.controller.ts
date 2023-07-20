import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

interface User {
  username: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  getHello(): User[] {
    return this.appService.getData();
  }

  @Put('user/:id')
  updatePassword(
    @Body() data: Pick<User, 'password'>,
    @Param('id') id: string,
  ): void {
    const dbData = this.appService.getData();
    const hasUser = dbData.some((user) => user.id === Number(id));
    if (typeof data['password'] === 'string' && hasUser) {
      const parsedData = dbData.map((user) => {
        if (user.id === Number(id)) {
          return {
            ...user,
            password: data.password,
          };
        }
        return user;
      });

      this.appService.setData(parsedData);
    } else {
      throw new HttpException('Bad request', 420);
    }
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string): void {
    const dbData = this.appService.getData();
    const hasUser = dbData.some((user) => user.id === Number(id));
    if (hasUser) {
      const parsedData = dbData.filter((user) =>
        user.id === Number(id) ? false : true,
      );

      this.appService.setData(parsedData);
    } else {
      throw new HttpException('Bad request', 420);
    }
  }

  @Post('user')
  @HttpCode(204)
  setData(@Body() data: any): void {
    const dbData = this.appService.getData();
    if (
      typeof data['username'] === 'string' &&
      typeof data['password'] === 'string' &&
      !dbData.some((user) => user.username === data['username'])
    ) {
      this.appService.addData(data);
    } else {
      throw new HttpException('Bad request', 420);
    }
  }
}
