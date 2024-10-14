import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json())
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

app.post('/clientes', async(req:Request, res:Response)=>{
    try{
        const { nome, cpf, dataNascimento, telefone, email } = req.body;
     const novoCliente = await prisma.cliente.create({
            data:{
                nome,
                cpf,
                dataNascimento: new Date(dataNascimento), // Certifique-se de que a data está no formato correto
                telefone,
                email, 
            }
        })

        
            res.status(201).json(novoCliente)
        
    }catch(erro){
        
        res.status(500).json({message:'Erro ao cadastrar cliente:'+erro })
    }
})




app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor está rodando na porta 3000");
});
