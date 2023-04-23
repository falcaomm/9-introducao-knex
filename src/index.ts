import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/bands", async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`
            SELECT * FROM bands;
        `)

        res.status(200).send(result)
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}) 

app.post("/bands", async (req: Request, res: Response) => {
    try {

        const id = req.body.id as string
        const name: string = req.body.name

        if (!id || !name) {
            res.status(400)
            throw new Error("Dados inváidos")
        }

        if (name.length < 3) {
            res.status(400)
            throw new Error("Nome muito curto")
        }

        await db.raw(`
            INSERT INTO bands (id, name)
            VALUES("${id}", "${name}");
        `)

        res.status(201).send("Banda adicionada")
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}) 

app.put("/bands/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const name: string = req.body.name

        if (!id) {
            res.status(400)
            throw new Error("ID inválido")
        }

        if (!name) {
            res.status(400)
            throw new Error("nome inválido")
        }

        if (name.length < 3) {
            res.status(400)
            throw new Error("Nome muito curto")
        }

        const [band] = await db.raw(`
            SELECT * FROM bands
            WHERE id = "${id}";
        `) // desconstrução de array ou usar band[0] mas melhor desconstrução

        if (!band) {
            res.status(404)
            throw new Error("banda não encontrada")
        }

        await db.raw(`
            UPDATE bands 
            SET name = "${name || band.name}"
            WHERE id = "${id}";
        `)

        res.status(201).send("Banda editada")
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}) 