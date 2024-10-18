import express, { Request, Response } from "express";   //Importando express com TypeScript
import { PrismaClient } from "@prisma/client";          //Importando prisma com TypeScript
import cors from 'cors'
const app = express();  //Instanciando o app
const prisma = new PrismaClient();  //Instanciando o prisma
app.use(express.json());  //Definindo o uso do json

let permitidos =['http://127.0.0.1', 'http://localhost']

const CORSCONFIG: object = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || permitidos.includes(origin)) {
      callback(null, true); // Origem permitida
    } else {
      callback(new Error('Origin not allowed by CORS')); // Origem não permitida
    }
  }
}


app.use(cors(CORSCONFIG));

app.get("/clientes", async (req: Request, res: Response) => {
  var clientes: object[] = [];
  try {
    if (clientes) {
      clientes = await prisma.cliente.findMany();

      res.status(201).send(clientes);
    } else {
      res.status(400).json({ message: "Erro ao buscar clientes" });
    }
  } catch (erro) {
    res.status(500).json({ message: "Erro ao buscar clientes" });
  }
});

app.get("/clientes/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cliente = await prisma.cliente.findUnique({
      where: {
        id: id,
      },
    });

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ message: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar cliente" }); // Retorna erro 500 em caso de falha
  }
});

app.post("/clientes", async (req: Request, res: Response) => {
  try {
    const { nome, cpf, dataNascimento, telefone, email } = req.body;
    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        cpf,
        dataNascimento: new Date(dataNascimento), // Certifique-se de que a data está no formato correto
        telefone,
        email,
      },
    });

    res.status(201).json(novoCliente);
  } catch (erro) {
    res.status(500).json({ message: "Erro ao cadastrar cliente:" + erro });
  }
});

app.put("/clientes", async (req: Request, res: Response) => {
  const { id, nome, cpf, dataNascimento, telefone, email } = req.body;
  try {
    var cliente = await prisma.cliente.update({
      where: {
        id: id, // Corrigido o uso da vírgula
      },
      data: {
        // Aqui você deve especificar os campos que quer atualizar, por exemplo:
        nome: nome, // Atualiza o nome do cliente
        cpf: cpf,
        dataNascimento: dataNascimento,
        telefone: telefone,
        email: email,
      },
    });
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(400).json({ message: "Não foi possível atualizar o cliente" });
    }
  } catch (erro) {
    res.status(500).json({ menssage: "Erro ao atualizar cliente" + erro });
  }
});

app.delete("/clientes", async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    if (id) {
      await prisma.cliente.delete({
        where: { id: id },
      });
      res.status(200).json({ message: "Cliente deletado" });
    } else {
      res.status(400).json({ message: "Erro ao deletar o  cliente" });
      
    }
  } catch (erro) {
    res.status(500).json({ message: "Erro ao entrar em clientes" + erro });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor está rodando na porta 3000");
});
