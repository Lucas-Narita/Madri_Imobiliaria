"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ImovelSchema = new mongoose_1.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
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
    imagemPrincipal: { type: String },
    imagensSecundarias: [{ type: String }],
    IPTUAnual: { type: Number }, // IPTU anual opcional
    IPTUMensal: { type: Number }, // IPTU mensal opcional
    aluguelValor: { type: Number }, // Preço de aluguel, aplicável se tipo="aluguel"
    valor: { type: Number }, // Preço de venda, aplicável se tipo="venda"
    // Novos campos adicionais
    numero: { type: String },
    bairro: { type: String },
    regiao: { type: String },
    subRegiao: { type: String },
    cidadeEstado: { type: String },
    finalidade: { type: String },
    tipoComplemento: { type: String },
    complemento: { type: String },
    torreBloco: { type: String },
    lazer: [{ type: String }],
    areaExterna: { type: Number },
    areaLote: { type: Number },
    metrosFrente: { type: Number },
    metrosFundo: { type: Number },
    metrosDireito: { type: Number },
    metrosEsquerdo: { type: Number },
    zonaUso: { type: String },
    coeficienteAproveitamento: { type: Number },
});
exports.default = mongoose_1.default.model("Imovel", ImovelSchema);
