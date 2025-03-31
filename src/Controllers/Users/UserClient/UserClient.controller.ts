import { Body, Controller, Post } from "@nestjs/common";
import { UserClient } from "src/Interfaces/UserClient";
import { UserClientService } from "src/Services/Users/UserClient/UserClient.service";


@Controller('userClient')
export class UserClientController {
    constructor(private readonly userClientService: UserClientService) {} // Injeção de dependência


    @Post('create')
    async createUserClient(@Body() userClientData: UserClient) {
        try{
            const { id, nome, senha } = userClientData;

            if (!id || !nome || !senha) {
                throw new Error('Dados incompletos: id, nome e senha são obrigatórios.');
            }
            const newUserClient = await this.userClientService.createUserClient(userClientData);
            return { status: 201, data: newUserClient };
        }catch(error){
            console.error('Erro ao criar UserClient:', error);
            throw new Error('Erro interno ao criar UserClient.');
        }
    }
}