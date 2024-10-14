"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get("/clientes", async (req, res) => {
    var clientes = [];
    try {
        if (clientes) {
            clientes = await prisma.cliente.findMany();
            res.status(201).send(clientes);
        }
        else {
            res.status(400).json({ message: "Erro ao buscar clientes" });
        }
    }
    catch (erro) {
        res.status(500).json({ message: "Erro ao buscar clientes" });
    }
});
app.get("/clientes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await prisma.cliente.findUnique({
            where: {
                id: id,
            },
        });
        if (cliente) {
            res.json(cliente);
        }
        else {
            res.status(404).json({ message: "Cliente não encontrado" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar cliente" }); // Retorna erro 500 em caso de falha
    }
});
app.post('/clientes', async (req, res) => {
    try {
        const { nome, cpf, dataNascimento, telefone, email } = req.body;
        const novoCliente = await prisma.cliente.create({
            data: {
                nome,
                cpf,
                dataNascimento: new Date(dataNascimento), // Certifique-se de que a data está no formato correto
                telefone,
                email,
            }
        });
        res.status(201).json(novoCliente);
    }
    catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar cliente:' + erro });
    }
});
app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor está rodando na porta 3000");
});
