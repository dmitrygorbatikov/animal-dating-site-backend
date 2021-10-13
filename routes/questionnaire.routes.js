const {Router} = require('express')
const router = Router()
const questionnaireController = require('../controllers/questionnaireController')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, questionnaireController.createQuestionnaire)

/**
 * @swagger
 * /questionnaire:
 *   post:
 *     summary: Создание анкеты
 *     tags: [Questionnaire]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     requestBody:
 *       required: true
 *       description: Последние 3 параметра необязательные
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionnaireBody'
 *     responses:
 *       200:
 *         description: Анкета создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Questionnaire'
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */


router.patch('/:id', authMiddleware, questionnaireController.updateQuestionnaire)

/**
 * @swagger
 * /questionnaire/{id}:
 *   patch:
 *     summary: Редактирование анкеты
 *     tags: [Questionnaire]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: questionnaire id
 *     requestBody:
 *       required: true
 *       description: Последние 3 параметра необязательные
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionnaireBody'
 *     responses:
 *       200:
 *         description: Анкета создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Questionnaire'
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.get('/filter', authMiddleware, questionnaireController.filterQuestionnaire)

/**
 * @swagger
 * /questionnaire/filter:
 *   get:
 *     summary: Фильтрация анкет
 *     tags: [Questionnaire]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *       - in: query
 *         name: alias
 *         schema:
 *           type: string
 *         required: false
 *         description: кличка
 *       - in: query
 *         name: breed
 *         schema:
 *           type: string
 *         required: false
 *         description: порода
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: тип
 *     responses:
 *       200:
 *         description: Анкета создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Questionnaire'
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

router.get('/', authMiddleware, questionnaireController.getQuestionnaire)

/**
 * @swagger
 * /questionnaire:
 *   get:
 *     summary: Получение отдельно проплаченных и не проплаченных анкет
 *     tags: [Questionnaire]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: access_token
 *     responses:
 *       200:
 *         description: Список анкет
 *       400:
 *         description: Что-то пошло не так
 *       401:
 *         description: Нет авторизации
 */

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     QuestionnaireBody:
 *       type: object
 *       required:
 *         - type
 *         - breed
 *         - alias
 *         - sex
 *         - age
 *         - description
 *         - images
 *         - dignity
 *         - price
 *         - paid
 *       properties:
 *         type:
 *           type: string
 *           description: тип животного
 *         breed:
 *           type: string
 *           description: порода
 *         alias:
 *           type: string
 *           description: кличка
 *         sex:
 *           type: string
 *           description: пол
 *         age:
 *           type: string
 *           description: возраст
 *         description:
 *           type: string
 *           description: описание
 *         images:
 *           type: array
 *           description: фотографии питомца
 *           items:
 *             type: string
 *         dignity:
 *           type: boolean
 *           description: титулы
 *         price:
 *           type: number
 *           description: цена
 *         paid:
 *           type: boolean
 *           description: платная анкета или нет
 *       example:
 *         type: собака
 *         breed: овчарка
 *         alias: дед
 *         sex: кабель
 *         age: 8 лет 10 месяцев
 *         description: описание
 *         images: ["base64 image","base64 image1"]
 *         dignity: false
 *         price: 0
 *         paid: false
 */