import { Injectable } from "@nestjs/common";
import { UserClient } from "src/Interfaces/UserClient";
import prismaClient from "src/Prisma/Prisma.service";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserClientService{
    async createUserClient(userClient: UserClient) {
        const userClientExists = await prismaClient.userCliente.findUnique({
            where: {
                id: userClient.id
            }
        });
        if (userClientExists) {
            throw new Error('User already exists');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userClient.senha, saltRounds);
        
        const createUserClient = await prismaClient.userCliente.create({
            data: {
                id: userClient.id,
                nome: userClient.nome,
                senha: hashedPassword,
                empresaId: userClient.empresaId
            }
        });

        return createUserClient;
    }

}