import { createServer } from 'node:http'
import { parse } from 'node:url'
import { randomUUID } from 'node:crypto'

const PORT = 3000;

// simulando um banco de dados que retorna um produto
async function handler (req, res) {
    if(req.method !== 'GET' || !req.url.includes('products')) return res.end('hi!')

    const { query: { productName } } = parse(req.url, true);
    
    const productPayload = {
        id: randomUUID(),
        product: productName
    };

    return res.end(JSON.stringify(productPayload))
}

createServer(handler)
.listen(PORT, () => console.log(`Product API running on port ${PORT}`))