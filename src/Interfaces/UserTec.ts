// Tipo para a criação do técnico (não inclui empresaId)
export type CreateUserTecnicoInput = {
    nome: string;
    senha: string;
    adminId: number; // ID do UserAdmin que está criando o técnico
  };
  
  // Tipo do técnico retornado após criação
  export type UserTecnico = {
    id: number;
    nome: string;
    empresaId: number; // Será preenchido automaticamente
  };