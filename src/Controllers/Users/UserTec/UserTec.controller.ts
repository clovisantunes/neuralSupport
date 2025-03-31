import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserTecService } from 'src/Services/Users/UserTec/UserTec.service';
import { CreateUserTecnicoInput } from 'src/Interfaces/UserTec';

@Controller('tecnicos')
export class UserTecController {
  constructor(private readonly userTecService: UserTecService) {}

  @Post()
  async criarTecnico(@Body() data: CreateUserTecnicoInput) {
    return this.userTecService.createUserTecnico(data);
  }

  @Get('por-admin/:adminId')
  async listarTecnicosDoAdmin(@Param('adminId') adminId: string) {
    return this.userTecService.getTecnicosPorAdmin(Number(adminId));
  }
}