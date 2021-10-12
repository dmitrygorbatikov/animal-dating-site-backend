const {Router} = require('express')
const router = Router()
const viewController = require('../controllers/viewController')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/:id', authMiddleware, viewController.createView)

/**
 * @swagger
 * /views/{id}:
 *   post:
 *     summary: Создаёт просмотр на анкете
 *     tags: [View]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id анкеты
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Просмотр добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/View'
 *       400:
 *         description: Анкета данным пользователем была просмотрена
 *       401:
 *         description: Нет авторизации
 */

router.get('/list', authMiddleware, viewController.getViews)

/**
 * @swagger
 * /views/list:
 *   get:
 *     summary: Получение просмотров за определённый период
 *     tags: [View]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id анкеты
 *       - in: body
 *         name: filter
 *         schema:
 *           type: object
 *           properties:
 *             dateFrom:
 *               type: number
 *             dateTo:
 *               type: number
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Просмотр добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/View'
 *       400:
 *         description: Анкета данным пользователем была просмотрена
 *       401:
 *         description: Нет авторизации
 */


module.exports = router