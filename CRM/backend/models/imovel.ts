import mongoose, { Document, Schema } from "mongoose";

export interface Cliente {
  nome: string;
  email: string;
  telefone: string;
}

export interface ImovelDocument extends Document {
  titulo: string;
  descricao?: string;
  valor: number;
  localizacao: string;
  area: number;
  quarto: number;
  banheiro: number;
  tipo: "venda" | "aluguel";
  categoria:
    | "andar corrido"
    | "apartamento"
    | "área privativa"
    | "casa"
    | "chácara"
    | "cobertura"
    | "fazenda"
    | "flat"
    | "galpão"
    | "garagem"
    | "kitnet"
    | "loja"
    | "lote"
    | "lote em condomínio"
    | "prédio"
    | "sala"
    | "salão"
    | "sítio";
  cliente: Cliente;
  cep: number;
  status: "pendente" | "aprovado";
  imagem?: string;
  imagens?: string[];

  // Novos campos adicionados
  numero?: string;
  bairro?: string;
  regiao?: string;
  subRegiao?: string;
  cidadeEstado?: string;
  finalidade?: string;
  tipoComplemento?: string;
  complemento?: string;
  torreBloco?: string;
  lazer?: string[]; // Opções de lazer
  areaExterna?: number;
  areaLote?: number;
  metrosFrente?: number;
  metrosFundo?: number;
  metrosDireito?: number;
  metrosEsquerdo?: number;
  zonaUso?: string;
  coeficienteAproveitamento?: number;
}

const ImovelSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  valor: { type: Number, required: true },
  localizacao: { type: String, required: true },
  cep: { type: Number, required: true },
  area: { type: Number, required: true },
  quarto: { type: Number },
  banheiro: { type: Number },
  tipo: {
    type: String,
    enum: ["venda", "aluguel"],
    required: true,
  },
  categoria: {
    type: String,
    enum: [
      "andar corrido",
      "apartamento",
      "área privativa",
      "casa",
      "chácara",
      "cobertura",
      "fazenda",
      "flat",
      "galpão",
      "garagem",
      "kitnet",
      "loja",
      "lote",
      "lote em condomínio",
      "prédio",
      "sala",
      "salão",
      "sítio",
    ],
    required: true,
  },
  cliente: {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["pendente", "aprovado"],
    default: "pendente",
  },
  imagem: { type: String },
  imagens: [{ type: String }],

  // Novos campos
  numero: { type: String },
  bairro: { type: String },
  regiao: { type: String },
  subRegiao: { type: String },
  cidadeEstado: { type: String },
  finalidade: { type: String },
  tipoComplemento: { type: String },
  complemento: { type: String },
  torreBloco: { type: String },
  lazer: [{ type: String }], // Array para opções de lazer
  areaExterna: { type: Number },
  areaLote: { type: Number },
  metrosFrente: { type: Number },
  metrosFundo: { type: Number },
  metrosDireito: { type: Number },
  metrosEsquerdo: { type: Number },
  zonaUso: { type: String },
  coeficienteAproveitamento: { type: Number },
});

export default mongoose.model<ImovelDocument>("Imovel", ImovelSchema);
