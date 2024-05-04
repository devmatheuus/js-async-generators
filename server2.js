// curl -X POST "http://localhost:4000/cart" -d '{"id": 1, "name": "sabao"}'
import { createServer } from 'node:http'

const PORT = 4000;

async function handler (req, res) {
    if(req.method !== 'POST' || !req.url.includes('cart')) return res.end('hi!')

    for await (const data of req) {
        const item = await JSON.parse(data);
        console.log('received', item)

        return res.end(`process succeeded for ${item.id}`)
    }

}

createServer(handler)
.listen(PORT, () => console.log(`Cart API running on port ${PORT}`))