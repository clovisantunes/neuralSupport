-- CreateEnum
CREATE TYPE "EmpresaType" AS ENUM ('ADMINISTRADORA', 'CLIENTES');

-- CreateEnum
CREATE TYPE "ChamadoStatus" AS ENUM ('EM_ANALISE', 'EM_ANDAMENTO', 'RESOLVIDO');

-- CreateTable
CREATE TABLE "UserAdmin" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "UserAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTecnico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "UserTecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "UserCliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "EmpresaType" NOT NULL,
    "administradorId" INTEGER,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chamado" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "ChamadoStatus" NOT NULL DEFAULT 'EM_ANALISE',
    "clienteId" INTEGER NOT NULL,
    "tecnicoId" INTEGER,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Chamado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nome_key" ON "Empresa"("nome");

-- AddForeignKey
ALTER TABLE "UserTecnico" ADD CONSTRAINT "UserTecnico_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCliente" ADD CONSTRAINT "UserCliente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_administradorId_fkey" FOREIGN KEY ("administradorId") REFERENCES "UserAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "UserCliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_tecnicoId_fkey" FOREIGN KEY ("tecnicoId") REFERENCES "UserTecnico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
