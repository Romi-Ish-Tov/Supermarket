const express = require('express');
const cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { connectToMongoDB } = require('./db/config');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "API Documentation - Supermarket",
        version: "1.0.0",
        description: "Project Application API",
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            email: "romieshtov1@gmail.com"
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server',
            },
        ],
    }
}

const app = express();
connectToMongoDB();

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
}
const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/user.js'));
app.use('/api/products', require('./routes/product.js'));
app.use('/api/carts', require('./routes/cart.js'));
app.use('/api/items', require('./routes/item.js'));
app.use('/api/receipts', require('./routes/receipt.js'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3001, (() => console.log('listening on port 3001')));