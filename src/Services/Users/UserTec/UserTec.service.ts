import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClient, UserTecnico } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserTecnicoInput } from 'src/Interfaces/UserTec';

const prisma = new PrismaClient();

@Injectable()
export class UserTecService {
  private readonly SALT_ROUNDS = 10;

  async createUserTecnico(data: CreateUserTecnicoInput): Promise<UserTecnico> {
    // 1. Buscar a empresa do Admin (para vincular o técnico)
    const empresaDoAdmin = await prisma.empresa.findFirst({
      where: { administradorId: data.adminId },
    });

    if (!empresaDoAdmin) {
      throw new Error('Admin não possui uma empresa associada.');
    }

    const tecnicoExistente = await prisma.userTecnico.findFirst({
      where: {
        nome: data.nome,
        empresaId: empresaDoAdmin.id,
      },
    });

    if (tecnicoExistente) {
      throw new ConflictException('Já existe um técnico com este nome na empresa.');
    }

    const senhaHash = await bcrypt.hash(data.senha, this.SALT_ROUNDS);

    const novoTecnico = await prisma.userTecnico.create({
      data: {
        nome: data.nome,
        senha: senhaHash,
        empresaId: empresaDoAdmin.id,
      },
      select: {
        id: true,
        nome: true,
        senha: true, 
        empresaId: true,
      },
    });

    return novoTecnico;
  }

  async getTecnicosPorAdmin(adminId: number): Promise<UserTecnico[]> {
    const empresaDoAdmin = await prisma.empresa.findFirst({
      where: { administradorId: adminId },
    });

    if (!empresaDoAdmin) {
      return [];
    }

    return prisma.userTecnico.findMany({
      where: { empresaId: empresaDoAdmin.id },
      select: {
        id: true,
        nome: true,
        senha: true,
        empresaId: true,
      },
    });
  }
}