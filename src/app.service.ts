import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  data = [
    {
      username: 'Gabriel',
      password: '123456',
      id: 0,
    },
    {
      username: 'Gabriel2',
      password: '123456',
      id: 1,
    },
  ];
  getData(): any[] {
    return this.data;
  }
  setData(data): void {
    this.data = data;
  }
  addData(data): void {
    const parsedData = {
      ...data,
      id: this.data.length,
    };
    this.data.push(parsedData);
  }
}
