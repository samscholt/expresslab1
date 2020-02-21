import express from 'express';
import cors from 'cors';

let cartItems = [
    {id: 1, product: "Snickers", price: 1.29, quantity: 1},
    {id: 5, product: "Coca-Cola", price: 1.59, quantity: 3},
    {id: 40, product: "Monster", price: 2.39, quantity: 1},
    {id: 6, product: "coffee", price: 0.99, quantity: 2},
];

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});

app.get('/cart-items', (req, res) => {
    res.json(cartItems);
});

app.get('/cart-items/:id', (req, res) => {
    const id = req.params.id;

    const position = cartItems.findIndex(element => element.id == id);

    if (position === -1) {
        res.status(404);
        res.json("ID not found");
    } else {
        res.json(cartItems[position]);
    }
});

app.post('/cart-items', (req, res) => {
    const body = req.body;

    const newID = new Date().getTime();

    const newItem = {
        id: newID,
        product: body.product,
        price: body.price,
        quantity: body.quantity
    };

    cartItems.push(newItem);

    res.status(201);
    res.json(newItem);
});

app.put('/cart-items/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const position = cartItems.findIndex(element => element.id == id);
    
    const newItem = {
        id: Number(id),
        product: body.product,
        price: body.price,
        quantity: body.quantity
    };

    cartItems.splice(position, 1, newItem);

    res.json(newItem);
});

app.delete('/cart-items/:id', (req, res) => {
    const id = req.params.id;

    const position = cartItems.findIndex(element => element.id == id);

    cartItems.splice(position, 1);

    res.status(204);
    res.json();         // I don't know if this is necessary, but Postman waits forever for a response without it
});