
import axios from "axios";

const PRODUCTS_URL = 'http://localhost:3000/products'
const CART_URL = 'http://localhost:4000/cart'

const myDb = async () => Array.from({ length: 1000 }, (_, i) => `${i} - product`)

async function* processDbDataGenerator () {
    const products = await myDb()
    
    for (const product of products) {
        const { data: productInfo } = await axios.get(`${PRODUCTS_URL}?productName=${product}`)
        const { data: productCartData } = await axios.post(CART_URL, productInfo)
        
        yield productCartData
    }
}

console.time('processDbData')
for await (const data of processDbDataGenerator()) {
    console.log('product', data)
}
console.timeEnd('processDbData')
