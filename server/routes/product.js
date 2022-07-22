const productController = require('../controllers/product-controller');

const router = require('express').Router();

router.get('/', productController.getAllProducts);
router.get('/stats', productController.getStoreStats);
router.get('/:categoryId', productController.getProductsByCategory);
router.post('/', productController.handleAdminAction);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:          
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *     productName:
 *      type: string
 *      description: Products's name.
 *      example: Milk
 *     productPrice:
 *      type: number
 *      description: Price of product.
 *      example: 12
 *     categoryId:
 *      type: string
 *      format: objectId
 *      example: 628f9d5c986d8c993fefc9c4
 *     productId:
 *      example: 628fa609d22ead55f8460f05
 *      description: optional
 *      type: string
 *      format: objectId
 *      unique: true
 *      required: false  
 *
 *   StatsPayload: 
 *    type: object
 *    properties:
 *     currentAmountOfProducts:
 *      type: integer
 *      example: 10
 *     currentAmountOfOrders:
 *      type: integer
 *      example: 13
 * 
 *   Category: 
 *    type: object
 *    properties:
 *     _id:
 *      type: integer
 *      example: 628f9d5c986d8c993fefc9c4
 *     categoryName:
 *      type: string
 *      example: Dairy
 * 
 */

/**
 * @swagger
 *  /api/products:
 *   get:
 *    tags: [ Product ]
 *    summary: Retrieves all products from the DataBase.
 *    description: Retrieves a list of all the products.
 *    responses:
 *      200:
 *        description: successful get all products.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               products:
 *                type: array
 *                items:
 *                 $ref: '#/components/schemas/Product'
 *               categories:
 *                type: array
 *                items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 *  /api/products/stats:
 *   get:
 *     tags: [ Product ]
 *     summary: Retrieves statistics of products and orders.
 *     description: Retrieves statistics of products and orders.
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: successful get amount of products and orders.
 *         content:
 *           application/json:
 *            schema:  
 *             $ref: '#/components/schemas/StatsPayload'
 * 
 */

/**
* @swagger
*  /api/products/{categoryId}:
*   get: 
*    tags: [ Product ]
*    summary: Retrieve a list of products by category id from db.
*    description: Retrieve a list of Products by Category.
*    parameters:
*       - in: path
*         name: categoryId
*         type: string
*         required: true
*         description: id of the requested category.
*    responses:
*      200:
*        description: A list of users.
*        content:
*          application/json:
*            schema:
*              type: array
*              items:
*                $ref: '#/components/schemas/Product'
*/

/**
* @swagger
*  /api/products/:
*   post:  
*    security:
*     - bearerAuth: []    
*    tags: [ Product ]
*    summary: update or add a product.
*    description: this request decideds wheter to add or update by the existence of the product id property in the body of the request.
*    requestBody:
*     description: Optional description in *Markdown*
*     required: true
*     content:
*      application/json:
*       schema:
*        $ref: "#/components/schemas/Product"         
*    responses:
*     201:
*      description: created.
*      content:
*       application/json:
*        schema:
*         type: array
*         items: 
*          $ref: "#/components/schemas/Product"         
*     401: 
*      description: Unauthorized Action
*/

module.exports = router;
