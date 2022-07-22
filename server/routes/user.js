const userController = require('../controllers/user-controller');

const router = require('express').Router();

router.get('/:id', userController.isIdUnique);
router.post('/', userController.addNewUser);
router.post('/login', userController.login);
router.post('/loginWithToken', userController.loginWithToken);

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     userId:
 *      type: string
 *      description: must be 9 characters long and qualify to israeli id formula.
 *      example: 208996546
 *      required: false
 *     firstName:
 *      type: string
 *      example: Romi
 *      required: false
 *     lastName:
 *      type: string
 *      example: ish tov
 *      required: false
 *     email:
 *      type: string
 *      format: email
 *      example: yoav@gmail.com
 *      required: false
 *     city:
 *      type: string
 *      example: Holon
 *      required: false
 *     street:
 *      type: string
 *      example: Hatavass
 *      required: false
 *     houseNumber:
 *      type: string
 *      example: 1
 *      required: false
 *     password:
 *      type: string
 *      description: Must be at least 6 characters long
 *      example: 123456
 *      required: false
 * 
 *   LoginPayload:
 *    type: object
 *    properties:
 *     userId:
 *      type: string
 *      description: must be 9 characters long and qualify to israeli id formula.
 *      example: 208996546
 *      required: false
 *     firstName:
 *      type: string
 *      example: Romi
 *      required: false
 *     lastName:
 *      type: string
 *      example: ish tov
 *      required: false
 *     email:
 *      type: string
 *      format: email
 *      example: yoav@gmail.com
 *      required: false
 *     city:
 *      type: string
 *      example: Holon
 *      required: false
 *     street:
 *      type: string
 *      example: Hatavass
 *      required: false
 *     houseNumber:
 *      type: string
 *      example: 1
 *      required: false
 *     password:
 *      type: string
 *      description: Must be at least 6 characters long
 *      example: 123456
 *      required: false
 *     role:
 *      type: string
 *      description: specifies whether the user is an admin or a customer.
 *      example: customer
 *      required: false
 *     token:
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMTQ4MDg4NjYiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTcwMzE4MzB9.lKDz7g5sf5Zeqs0JIhQOZ0hoB8TCD_WjSF0E98SJD4M
 *      description: JWT Bearer token - contains encrypted role and userId.
 *      required: false
 */

/**
* @swagger
*  /api/users/{userId}:
*   get:
*     tags: [ User ]
*     summary: Verify id is unique.
*     description: Return true if id does not exist in db and false if it does.
*     parameters:
*        - in: path
*          name: userId
*          type: string
*          required: true
*          description: user input in id field.
*          example: 314808866
*     responses:
*       200:
*         description: successful.
*         content:
*           application/json:
*             schema:
*               type: boolean
*/


/**
* @swagger
*  /api/users/:
*   post:  
*    tags: [ User ]
*    summary: Register request.
*    description: this request attempts to add a new user to the db.
*    requestBody:
*     description: Contains user's info.
*     required: true
*     content:
*      application/json:
*       schema:
*        $ref: "#/components/schemas/User"         
*    responses:
*     201:
*      description: successful registration attempt.
*      content:
*       application/json:
*        schema:
*         type: string
*         example: user saved
*     401: 
*      description: Unauthorized Action
*/


/**
* @swagger
*  /api/users/login:
*   post:  
*    tags: [ User ]
*    summary: Login request.
*    description: this request attempts to login a user.
*    requestBody:
*     required: true       
*     content:
*      application/json:
*       schema:
*        type: object
*        properties:
*         userId:
*          type: string
*          example: 208996546
*          description: user's id.               
*         password:
*          type: string
*          example: 123456
*          description: user's password.               
*    responses:
*     200:
*      description: successful registration attempt.
*      content:
*       application/json:
*        schema:
*          $ref: "#/components/schemas/LoginPayload" 
*     401: 
*      description: Unauthorized Action
*/


/**
* @swagger
*  /api/users/loginWithToken:
*   post:  
*    tags: [ User ]
*    summary: Login with token request.
*    description: this request attempts to login a user.
*    requestBody:
*     required: true       
*     content:
*      application/json:
*       schema:
*        type: object
*        properties:
*         token:
*          type: string
*          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMTQ4MDg4NjYiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NTcwMzE4MzB9.lKDz7g5sf5Zeqs0JIhQOZ0hoB8TCD_WjSF0E98SJD4M
*          description: user's token from local storage.                           
*    responses:
*     201:
*      description: successful login attempt.
*      content:
*       application/json:
*        schema:
*          $ref: "#/components/schemas/User" 
*     401: 
*      description: Unauthorized Action
*/


module.exports = router;