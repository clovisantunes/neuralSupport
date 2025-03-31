import { Controller, Post, Body, HttpStatus, HttpException, Get } from '@nestjs/common';
import { UserAdminService } from 'src/Services/Users/UserAdmin/userAdmin.service';
import { userAdmin } from 'src/Interfaces/AdminUser';
import { EmpresaType } from '../../../Interfaces/EmpresaType';

@Controller('userAdmin') 
export class UserAdminController {
    constructor(private readonly userAdminService: UserAdminService) {} // Injeção de dependência

    @Post('create')
    async createUserAdmin(@Body() userAdminData: userAdmin) {
        try {
            const { id, nome, senha } = userAdminData;

            if (!id || !nome || !senha) {
                throw new HttpException('Dados incompletos: id, nome e senha são obrigatórios.', HttpStatus.BAD_REQUEST);
            }

            const novoUserAdmin = await this.userAdminService.createUserAdmin(userAdminData);
            return { status: HttpStatus.CREATED, data: novoUserAdmin };
        } catch (error) {
            console.error('Erro ao criar UserAdmin:', error);
            throw new HttpException('Erro interno ao criar UserAdmin.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('empresa/create')
    async createEmpresa(@Body() body: { nome: string; tipo: EmpresaType; userAdminId: number }) {
        try {
            const { nome, tipo, userAdminId } = body;

            if (!nome || !tipo || !userAdminId) {
                throw new HttpException('Dados incompletos: nome, tipo e userAdminId são obrigatórios.', HttpStatus.BAD_REQUEST);
            }

            const novaEmpresa = await this.userAdminService.createEmpresa(nome, tipo, userAdminId);
            return { status: HttpStatus.CREATED, data: novaEmpresa };
        } catch (error) {
            console.error('Erro ao criar empresa:', error);
            throw new HttpException('Erro interno ao criar empresa.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
        @Get('')
        async getAllUserAdmins() {
            try {
                const userAdmins = await this.userAdminService.getAllUserAdmins();
                return { status: HttpStatus.OK, data: userAdmins };
            } catch (error) {
                console.error('Erro ao buscar UserAdmins:', error);
                throw new HttpException('Erro interno ao buscar UserAdmins.', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
}

