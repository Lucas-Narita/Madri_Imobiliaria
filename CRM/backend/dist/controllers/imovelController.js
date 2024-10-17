"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aprovarImovel = exports.deleteImovel = exports.getAllImoveis = exports.updateImovel = exports.getImovelById = exports.createImovel = void 0;
const imovel_1 = __importDefault(require("../models/imovel"));
const cliente_1 = __importDefault(require("../models/cliente"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
// Configuração do multer para upload de arquivos (opcional)
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(__dirname, "..", "..", "uploads");
        // Verificar se a pasta 'uploads' existe, se não, criá-la
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Caminho absoluto para a pasta uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Renomeia o arquivo com timestamp
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por arquivo
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true); // Permite o upload se for uma imagem
        }
        else {
            cb(null, false); // Rejeita o arquivo se não for uma imagem
            return cb(new Error("Formato de arquivo inválido. Apenas imagens são permitidas."));
        }
    },
}).fields([
    { name: "imagemPrincipal", maxCount: 1 },
    { name: "imagensSecundarias", maxCount: 5 },
]);
// Função para criar um novo imóvel
const createImovel = (req, res) => {
    upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (err) {
                console.log("Erro no upload de imagens:", err);
                return res.status(500).json({ error: "Erro no upload de imagens" });
            }
            try {
                console.log("Início da criação do imóvel...");
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    return res.status(401).json({ error: "Token não fornecido" });
                }
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const userId = decoded.id;
                console.log("ID do cliente autenticado:", userId);
                if (!userId) {
                    return res.status(401).json({ error: "Cliente não autenticado" });
                }
                const cliente = yield cliente_1.default.findById(userId);
                if (!cliente) {
                    console.log("Cliente não encontrado.");
                    return res.status(404).json({ error: "Cliente não encontrado" });
                }
                console.log("Cliente autenticado:", cliente);
                const { titulo, descricao, localizacao, cep, area, quarto, banheiro, tipo, categoria, numero, bairro, regiao, subRegiao, cidadeEstado, finalidade, tipoComplemento, complemento, torreBloco, lazer, areaExterna, areaLote, metrosFrente, metrosFundo, metrosDireito, metrosEsquerdo, zonaUso, coeficienteAproveitamento, IPTUAnual, IPTUMensal, aluguelValor, valor, } = req.body;
                console.log("Dados recebidos do formulário:", req.body);
                const files = req.files;
                const imagemPrincipal = (files === null || files === void 0 ? void 0 : files.imagemPrincipal)
                    ? files["imagemPrincipal"][0].filename
                    : undefined;
                const imagensSecundarias = (files === null || files === void 0 ? void 0 : files.imagensSecundarias)
                    ? files["imagensSecundarias"].map((file) => file.filename)
                    : [];
                console.log("Arquivos recebidos:", files);
                console.log("Dados do imóvel:", {
                    titulo,
                    descricao,
                    localizacao,
                    cep,
                    area,
                    quarto,
                    banheiro,
                    tipo,
                    categoria,
                    numero,
                    bairro,
                    regiao,
                    subRegiao,
                    cidadeEstado,
                    finalidade,
                    tipoComplemento,
                    complemento,
                    torreBloco,
                    lazer,
                    areaExterna,
                    areaLote,
                    metrosFrente,
                    metrosFundo,
                    metrosDireito,
                    metrosEsquerdo,
                    zonaUso,
                    coeficienteAproveitamento,
                    IPTUAnual,
                    IPTUMensal,
                    aluguelValor,
                    valor,
                    imagemPrincipal,
                    imagensSecundarias,
                });
                const novoImovel = new imovel_1.default({
                    titulo,
                    descricao,
                    localizacao,
                    cep,
                    area,
                    quarto,
                    banheiro,
                    tipo,
                    categoria,
                    cliente: {
                        nome: cliente.nomeRazaoSocial,
                        email: cliente.email,
                        telefone: cliente.telefone,
                    },
                    status: "pendente",
                    imagemPrincipal: (files === null || files === void 0 ? void 0 : files["imagemPrincipal"])
                        ? files["imagemPrincipal"][0].filename
                        : undefined,
                    imagensSecundarias: (files === null || files === void 0 ? void 0 : files["imagensSecundarias"])
                        ? files["imagensSecundarias"].map((file) => file.filename)
                        : [],
                    numero,
                    bairro,
                    regiao,
                    subRegiao,
                    cidadeEstado,
                    finalidade,
                    tipoComplemento,
                    complemento,
                    torreBloco,
                    lazer,
                    areaExterna,
                    areaLote,
                    metrosFrente,
                    metrosFundo,
                    metrosDireito,
                    metrosEsquerdo,
                    zonaUso,
                    coeficienteAproveitamento,
                    IPTUAnual,
                    IPTUMensal,
                    aluguelValor: tipo === "aluguel" ? aluguelValor : undefined,
                    valor: tipo === "venda" ? valor : undefined,
                });
                console.log("Novo imóvel a ser criado:", novoImovel);
                const imovel = yield novoImovel.save();
                console.log("Imóvel criado com sucesso:", imovel);
                return res.status(201).json(imovel);
            }
            catch (err) {
                console.error("Erro ao criar imóvel:", err);
                return res.status(500).json({ error: "Erro ao criar imóvel" });
            }
        });
    });
};
exports.createImovel = createImovel;
// Outras funções do controller permanecem inalteradas
const getImovelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imovel = yield imovel_1.default.findById(req.params.id);
        if (!imovel)
            return res.status(404).json({ error: "Imóvel não encontrado" });
        res.json(imovel);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao buscar imóvel" });
    }
});
exports.getImovelById = getImovelById;
const updateImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imovel = yield imovel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!imovel)
            return res.status(404).json({ error: "Imóvel não encontrado" });
        res.json(imovel);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao atualizar imóvel" });
    }
});
exports.updateImovel = updateImovel;
const getAllImoveis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imoveis = yield imovel_1.default.find();
        res.json(imoveis);
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao buscar imóveis" });
    }
});
exports.getAllImoveis = getAllImoveis;
const deleteImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imovel = yield imovel_1.default.findByIdAndDelete(req.params.id);
        if (!imovel)
            return res.status(404).json({ error: "Imóvel não encontrado" });
        res.json({ message: "Imóvel deletado com sucesso" });
    }
    catch (err) {
        res.status(500).json({ error: "Erro ao deletar imóvel" });
    }
});
exports.deleteImovel = deleteImovel;
const aprovarImovel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imovel = yield imovel_1.default.findByIdAndUpdate(req.params.id, { status: "aprovado" }, { new: true });
        if (!imovel) {
            return res.status(404).json({ error: "Imóvel não encontrado" });
        }
        // Dados básicos para envio de leads
        const leadData = {
            LeadName: imovel.cliente.nome,
            LeadEmail: imovel.cliente.email,
            LeadTelephone: imovel.cliente.telefone,
            Message: `Anúncio aprovado para o imóvel: ${imovel.titulo}`,
            ExternalId: imovel._id,
            BrokerEmail: "seu_email@imobiliaria.com",
            LeadOrigin: "ImobiliariaSistema",
        };
        // Adicionar parâmetros específicos com base na nova categoria
        switch (imovel.categoria) {
            case "andar corrido":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2000;
                break;
            case "apartamento":
                leadData.BusinessType = ["SALE"];
                leadData.category = 1000;
                break;
            case "área privativa":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2010;
                break;
            case "casa":
                leadData.BusinessType = ["SALE"];
                leadData.category = 1010;
                break;
            case "chácara":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2020;
                break;
            case "cobertura":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2030;
                break;
            case "fazenda":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2040;
                break;
            case "flat":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2050;
                break;
            case "galpão":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2060;
                break;
            case "garagem":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2070;
                break;
            case "kitnet":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2080;
                break;
            case "loja":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2090;
                break;
            case "lote":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2100;
                break;
            case "lote em condomínio":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2110;
                break;
            case "prédio":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2120;
                break;
            case "sala":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2130;
                break;
            case "salão":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2140;
                break;
            case "sítio":
                leadData.BusinessType = ["SALE"];
                leadData.category = 2150;
                break;
            default:
                return res.status(400).json({ error: "Categoria de imóvel inválida" });
        }
        // Enviar requisição para OLX/Zap
        const response = yield axios_1.default.post("https://crm-leadmanager-leadreceiver-api.gestao.prod.olxbr.io/v1/addLeads", leadData, {
            headers: {
                "X-API-KEY": process.env.OLX_API_KEY || "",
                "X-Agent-Name": process.env.OLX_AGENT_NAME || "",
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        res.status(200).json({
            message: "Imóvel aprovado e anúncio enviado para OLX/Zap",
            data: response.data,
        });
    }
    catch (err) {
        console.error("Erro ao aprovar imóvel ou enviar para OLX/Zap:", err.message);
        res
            .status(500)
            .json({ error: "Erro ao aprovar imóvel ou enviar para OLX/Zap" });
    }
});
exports.aprovarImovel = aprovarImovel;
module.exports = {
    getAllImoveis: exports.getAllImoveis,
    createImovel: exports.createImovel,
    getImovelById: exports.getImovelById,
    updateImovel: exports.updateImovel,
    deleteImovel: exports.deleteImovel,
    aprovarImovel: exports.aprovarImovel,
    upload,
};
