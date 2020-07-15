import { Fornecedor } from './fornecedor.interface';

export interface Item {
    id?: number;
    descricao: string;
    preco: number;
    fornecedores: Fornecedor[];
    entrada?: Date;
}