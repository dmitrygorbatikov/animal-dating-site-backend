const {Router} = require('express')
const router = Router()
const iotController = require('../controllers/iotController')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/', authMiddleware, iotController.getSensorParameters)

/**
 * @swagger
 * /iot:
 *   get:
 *     summary: Получение температуры, сердцебиения и геопозиции животного
 *     tags: [Iot]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Данные с Iot
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

module.exports = router