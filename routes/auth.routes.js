const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController.js')

router.post('/register', authController.register)
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: Body параметры для регистрации
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Регистрация прошла успешно
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/View'
 *       400:
 *         description: Анкета данным пользователем была просмотрена
 */
router.post('/login', authController.login)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Логин
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       description: Body параметры для логина
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Регистрация прошла успешно
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/View'
 *       400:
 *         description: Анкета данным пользователем была просмотрена
 */

module.exports = router