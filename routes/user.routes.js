const {Router} = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', authMiddleware, userController.profile)

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Получение профиля пользователя
 *     tags: [User]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

module.exports = router