const itemController = require('../controllers/item-controller');

const router = require('express').Router();

router.post('/', itemController.updateItem);
router.get('/:cartId', itemController.getItemsByCartId);
router.delete('/:cartId', itemController.deleteCartItems);

module.exports = router;

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:          
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schemas:
 *   Item:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: objectId
 *      description: Item identifier.
 *      example: 629f6b67bb629cdce74a9b7c
 *      required: true
 *     cartId:
 *      type: string
 *      format: objectId
 *      description: Cart identifier.
 *      example: 628f9f6e986d8c993fefc9d1
 *      required: true
 *     productId:
 *      type: string
 *      format: objectId
 *      description: Product identifier.
 *      example: 628f9f6e986d8c993fefc9d1
 *      required: true
 *     quantity:
 *      type: number
 *      example: 4
 *      required: false
 *         
 */

/**
* @swagger
*  /api/items/:
*   post:  
*    security:
*     - bearerAuth: []  
*    tags: [ Item ]
*    summary: update cart inventory.
*    description: this request changes the quantity of an item in the user's cart.
*    requestBody:
*     description: Contains item's info.
*     required: true
*     content:
*      application/json:
*       schema:
*        type: object
*        properties:
*         cartId:
*          example: "62c40016241151b7a0614d22"
*          type: string
*          format: objectId
*          description: Cart identifier.            
*         productId:
*          type: string
*          format: objectId
*          description: Product identifier. 
*          example: 628f9fa1986d8c993fefc9d7           
*         quantity:
*          type: number
*          example: 2
*          description: Amount of items added to cart. if amount is 0 the item will be deleted            
*    responses:
*     200:
*      description: successful cart alteration.
*      content:
*       application/json:
*        schema:
*         type: array
*         items: 
*          $ref: '#/components/schemas/Item'
*     401: 
*      description: Unauthorized Action
*/

/**
* @swagger
*  /api/items/{cartId}:
*   get: 
*    security:
*     - bearerAuth: []  
*    tags: [ Item ]
*    summary: Retrieve a list of items by cart id from db.
*    description: Retrieve a list of items by cart id from db.
*    parameters:
*     - in: path
*       name: cartId
*       type: string
*       required: true
*       description: id of the requested cart.
*    responses:
*      200:
*       description: A list of items.
*       content:
*         application/json:
*          schema:
*           type: array
*           items: 
*            $ref: '#/components/schemas/Item'
*/

/**
* @swagger
*  /api/items/{cartId}:
*   delete: 
*    security:
*     - bearerAuth: []  
*    tags: [ Item ]
*    summary: Delete request.
*    description: Delete all Items by Cart id.
*    parameters:
*     - in: path
*       name: cartId
*       type: string
*       required: true
*       example: 62c40099241151b7a0614d83
*       description: id of the requested cart.
*    responses:
*      200:
*       description: successful deleted item.
*       content:
*         application/json:
*           schema:
*             type: object
*             properties: 
*              error:
*               type: boolean
*               example: false
*              msg:
*               type: string
*               example: successful deleted cart items
*/
