// npx tsc --init
// npx tsc --watch
// npm i @types/node

import { writeFile } from "fs"
import { createServer, IncomingMessage, ServerResponse } from "http"
import { parse } from "query-string"
import * as url from "url"

const port = 8000
const server = createServer((req: IncomingMessage,res: ServerResponse) => {
    var resposta
    const urlParse = url.parse(req.url ? req.url : "", true)
    const params = parse(urlParse.search ? urlParse.search : "")

    if(urlParse.pathname == "/criar-atualizacao-usuario"){
        writeFile(`users/${params.id}.txt`,JSON.stringify(params), (err: any) => {
            if (err) throw err;
            console.log("Saved!")
            resposta = "Usuario criado/atualizado com sucesso"
            res.statusCode = 200
            res.setHeader("Content-Type","text/plain")
            res.end(resposta)
        })
    }
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})