const View = require('../models/Views')
const Questionnaire = require('../models/Questionnaire.js')

class ViewController {
    async createView(req,res) {
        try{
            const questionnaire = await Questionnaire.findOne({_id: req.params.id})
            if(!questionnaire){
                return res.status(400).json({error: "Анкета не найдена"})
            }
            const candidate = await View.findOne({userId: req.user.userId, questionnaireId: req.params.id})
            if(!candidate){
                const view = new View({
                    questionnaireId: req.params.id,
                    userId: req.user.userId,
                    date: parseInt(Date.now().toString())
                })
                await view.save()
                return res.status(201).json(view)
            }
            return res.status(200).json({message: "Анкета данным пользователем была просмотрена"})
        }
        catch (e) {
            return res.status(400).json({message:e})
        }
    }

    async getViews(req,res) {
        try{
            const questionnaire = await Questionnaire.findOne({_id: req.query.id})

            const dateFrom = req.body.dateFrom !== undefined ? req.body.dateFrom : questionnaire.createdDate
            const dateTo = req.body.dateTo !== undefined ? req.body.dateTo : parseInt(Date.now().toString())

            const views = await View.find({questionnaireId: req.query.id, date: {$gt: dateFrom, $lt: dateTo}}).count()
            return res.status(200).json(views)
        }
        catch (e) {
            return res.status(400).json({message:e})
        }
    }
}

module.exports = new ViewController()