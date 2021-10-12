const {Schema, model} = require('mongoose')

const schema = new Schema({
    //тип
    type: {
        type: String,
        required: true
    },
    // порода
    breed: {
        type: String,
        required: true
    },
    // кличка
    alias: {
        type: String,
        required: true
    },
    // пол
    sex: {
        type: String,
        required: true
    },
    // возраст
    age: {
        type: String,
        required: true
    },
    // описание
    description:{
        type: String,
        required: true,
    },
    // массив картинок
    images:{
        type: Array,
        required: true,
    },
    // титулы
    dignity: {
        type: Boolean,
        required: true,
        default: false
    },
    // цена
    price: {
        type: Number,
        required: true,
        default: 0
    },
    // проплаченная анкета или нет
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Number,
        required: true
    }
})

module.exports = model('Questionnaire', schema)

/**
 * @swagger
 * components:
 *   schemas:
 *     Questionnaire:
 *       description: АНКЕТА
 *       type: object
 *       required:
 *         - _id
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
 *         - userId
 *         - createdDate
 *       properties:
 *         _id:
 *           type: string
 *           description: id анкеты
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
 *           type: number
 *           description: возраст
 *         description:
 *           type: string
 *           description: описание
 *         images:
 *           type: array
 *           description: фотографии животного
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
 *           description: проплаченная анкета или нет
 *         userId:
 *           type: string
 *           description: id пользователя, который создаёт анкету
 *         createdDate:
 *           type: number
 *           description: дата создания анкеты
 *       example:
 *         _id: 616597cbc70d6fc188334e08
 *         type: собака
 *         breed: овчарка
 *         alias: Глеб
 *         sex: кабель
 *         age: 2 года 8 месяцев
 *         description: тупа пажилой пёс
 *         images: ["base64 image", "base64 image"]
 *         dignity: true
 *         price: 0
 *         paid: false
 *         userId: 61659794c70d6fc188334e05
 *         createdDate: 1634047947799
 */