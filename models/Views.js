const {Schema, model} = require('mongoose')

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    questionnaireId: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },

})

module.exports = model('View', schema)

/**
 * @swagger
 * components:
 *   schemas:
 *     View:
 *       description: ПРОСМОТР
 *       type: object
 *       required:
 *         - _id
 *         - userId
 *         - questionnaireId
 *         - date
 *       properties:
 *         _id:
 *           type: string
 *           description: id просмотра
 *         userId:
 *           type: string
 *           description: id пользователя, который просмотрел анкету
 *         questionnaireId:
 *           type: string
 *           description: id анкеты
 *         date:
 *           type: string
 *           description: дата просмотра
 *       example:
 *         _id: 61659794c70d6fc188334e05
 *         userId: 61659794c70d6fc188334e05
 *         questionnaireId: 616597cbc70d6fc188334e08
 *         date: 1634050621110
 */