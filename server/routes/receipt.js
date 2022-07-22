const receiptController = require('../controllers/receipt-controller');

const router = require('express').Router();

router.get('/:id', receiptController.getRecieptByCartId);

module.exports = router;

/**
* @swagger
*  /api/receipts/{cartId}:
*   get: 
*    tags: [ Receipt ]
*    summary: Retrieve text file of the receipt by passing cart id.
*    description: Retrieve text file of the receipt by passing cart id.
*    parameters:
*     - in: path
*       name: cartId
*       type: string
*       description: id of the requested cart.
*       required: true
*       example: 62c40016241151b7a0614d22
*    responses:
*      200:
*       description: reciept.
*       content:
*        application/json; charset=utf-8:
*         schema:
*          type: string
*      404:
*       description: failed to find reciept.
*       content:
*        application/json; charset=utf-8:
*         schema:
*          type: string
*/
