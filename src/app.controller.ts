import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-status')
  async getDatabaseStatus(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1');
      return '資料庫連線成功!';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤';
      return `資料庫連線失敗: ${errorMessage}`;
    }
  }
}
