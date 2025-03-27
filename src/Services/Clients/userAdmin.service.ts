import { userAdmin } from "src/Interfaces/AdminUser";
import prismaClient from "src/Prisma/Prisma.service";
import * as bcrypt from 'bcrypt';
import { EmpresaType } from "../../Interfaces/EmpresaType";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserAdminService {
    async createUserAdmin(user: userAdmin) {
        const userExists = await prismaClient.userAdmin.findUnique({
            where: {
                id: user.id
            }
        });
        if (userExists) {
            throw new Error('User already exists');
        }

        // Criptografa a senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.senha, saltRounds);

        // Cria o UserAdmin (sem vincular a uma empresa inicialmente)
        const createUserAdmin = await prismaClient.userAdmin.create({
            data: {
                id: user.id,
                nome: user.nome,
                senha: hashedPassword,
            }
        });

        return createUserAdmin;
    }

    async createEmpresa(nome: string, tipo: string, userAdminId: number) {
        const userAdminExists = await prismaClient.userAdmin.findUnique({
            where: {
                id: userAdminId
            }
        });
        if (!userAdminExists) {
            throw new Error('UserAdmin not found');
        }

        const novaEmpresa = await prismaClient.empresa.create({
            data: {
                nome: nome,
                tipo: tipo as EmpresaType,
                administradorId: userAdminId, 
            }
        });

        return novaEmpresa;
    }

    async linkUserAdminToEmpresa(userAdminId: number, empresaId: number) {
        const userAdminExists = await prismaClient.userAdmin.findUnique({
            where: {
                id: userAdminId
            }
        });
        if (!userAdminExists) {
            throw new Error('UserAdmin not found');
        }

        const empresaExists = await prismaClient.empresa.findUnique({
            where: {
                id: empresaId
            }
        });
        if (!empresaExists) {
            throw new Error('Empresa not found');
        }

        // Vincula o UserAdmin à empresa
        const updatedEmpresa = await prismaClient.empresa.update({
            where: {
                id: empresaId
            },
            data: {
                administradorId: userAdminId 
            }
        });

        return updatedEmpresa;
    }

    async getAllUserAdmins() {
        return prismaClient.userAdmin.findMany();
    }
}