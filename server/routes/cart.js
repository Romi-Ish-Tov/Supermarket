const cartController = require('../controllers/cart-controller');

const router = require('express').Router();

router.get('/', cartController.getCartByUserId);
router.patch('/', cartController.closeCart);

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
 *   CartGetResponse:
 *    type: object
 *    properties:
 *     currentCart:
 *      type: object
 *      properties:
 *       cart:
 *        type: object
 *        properties: 
 *         _id: 
 *           example: 62c2d95361c4963d61e92ad3
 *         userId:
 *           example: 314808866
 *         isComplete:
 *           example: false
 *         creationDate:
 *           example: 2022-07-04T12:04:00.000Z
 *       cartItems:
 *        type: array
 *        items:
 *         type: object
 *         properties:
 *          _id: 
 *           example: 62c2d95361c4963d61e92ad3
 *          cartId: 
 *           example: 62c2d730c8b4d1e234c5fdf7
 *          productId: 
 *           example: 62935d944ea37cbdfc973305
 *          quantity: 
 *           example: 3
 *     latestCart:
 *       required: false
 *       type: object
 *       properties: 
 *        _id: 
 *          example: 62c2d95361c4963d61e92ad3
 *        userId:
 *          example: 314808866
 *        isComplete:
 *          example: true
 *        creationDate:
 *          example: 2022-07-04T12:04:00.000Z
 *        orderDetails:
 *         type: object
 *         properties:
 *          city:
 *           example: Or Yehuda
 *          street:
 *           example: Hertzel
 *          houseNumber:
 *           example: 28
 *          shippingDate:
 *           example: 2022-07-01
 *          contactInfo:
 *           type: string
 *           example: 054-1235678
 *          last4Digits:
 *           example: 1234
 *        totalPrice:
 *         example: 53
 * 
 *   CartPatchResponse:
 *    type: object
 *    properties:
 *     newCartData:
 *      type: object
 *      properties:
 *       cartItems:
 *         type: array
 *         example: []
 *       _id:
 *        type: string
 *        format: objectId
 *        description: cart identifier.
 *        example: 629f6b67bb629cdce74a9b7c
 *        required: true
 *       userId:
 *        type: string
 *        format: objectId
 *        description: user identifier.
 *        example: 628f9f6e986d8c993fefc9d1
 *        required: true
 *       isComplete:
 *        type: boolean
 *        example: false
 *        required: true
 *       creationDate:
 *        type: date
 *        example: 2022-06-27T13:57:45.000+00:00
 *        required: true  
 *       last4Digits:
 *        type: string
 *        example: 1234
 *        required: true  
 */


/**
* @swagger
*  /api/carts/:
*   get: 
*    security:
*     - bearerAuth: []  
*    tags: [ Cart ]
*    summary: Retrieves all items in a user's open cart.
*    description: Retrieves all items in a user's open cart.
*    responses:
*      200:
*       description: A list of items of user's cart.
*       content:
*        application/json:
*         schema:
*          $ref: '#/components/schemas/CartGetResponse'
*/


/**
* @swagger
*  /api/carts/:
*   patch:  
*    security:
*     - bearerAuth: []  
*    tags: [ Cart ]
*    summary: Close Cart and create receipt.
*    description: this request attempts to close user's Cart and create receipt.
*    requestBody:
*     description: Contains cart's info.
*     required: true
*     content:
*      application/json:
*       schema:
*        type: object
*        properties:
*         cartId:
*          type: string
*          format: objectId
*          example: 62c43a7f003127cd82e78914
*          description: Cart identifier.            
*         orderDetails:
*          required: true
*          type: object  
*          properties:
*           city:
*            example: Or Yehuda
*           street:
*            example: Hertzel
*           houseNumber:
*            example: 28
*            type: string
*           last4Digits:
*            example: 1234
*            type: string
*           contactInfo:
*            example: 0544494986
*            type: string
*           shippingDate:
*            example: 2022-07-04
*    responses:
*     201:
*      description: successful registration attempt.
*      content:
*       application/json:
*        schema:
*          $ref: '#/components/schemas/CartPatchResponse'
*     401: 
*      description: Unauthorized Action
*/

