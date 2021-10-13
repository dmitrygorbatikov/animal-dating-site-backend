const Questionnaire = require('../models/Questionnaire.js')
class QuestionnaireController{
    async createQuestionnaire(req,res){
        console.log(req)
        try{
            const questionnaire = new Questionnaire({
                type: req.body.type?.toLowerCase(),
                breed: req.body.breed?.toLowerCase(),
                alias: req.body.alias,
                sex: req.body.sex?.toLowerCase(),
                age: req.body.age,
                description: req.body.description,
                images: req.body.images,
                dignity: req.body.dignity,
                price: req.body.price,
                paid: req.body.paid,
                userId: req.user.userId,
                createdDate: parseInt(Date.now().toString())
            })

            await questionnaire.save()

            return res.status(201).json(questionnaire)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }

    async updateQuestionnaire(req,res){
        try{
            if((req.body.type !== undefined && req.body.type.length === 0) ||
                (req.body.breed !== undefined && req.body.breed.length === 0) ||
                (req.body.alias !== undefined && req.body.alias.length === 0) ||
                (req.body.sex !== undefined && req.body.sex.length === 0) ||
                (req.body.age !== undefined && req.body.age.length === 0) ||
                (req.body.description !== undefined && req.body.description.length === 0) ||
                (req.body.images !== undefined && req.body.images.length === 0) ||
                (req.body.dignity !== undefined && req.body.dignity.length === 0) ||
                (req.body.price !== undefined && req.body.price.length === 0 && isNaN(req.body.price)) ||
                (req.body.paid !== undefined && req.body.paid.length === 0)
            ) {
                return res.status(400).json({error: "Поля не должны быть пустыми"})
            }

            const questionnaire = await Questionnaire.findOne({_id: req.params.id})
            if(!questionnaire){
                return res.status(400).json({message: 'Анкета не найдена'})
            }

            await Questionnaire.findByIdAndUpdate({_id: req.params.id}, req.body)

            return res.status(200).json({message: "Updated"})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }

    async getQuestionnaire(req,res){
        try{
            const paidQuestionnaire = await Questionnaire.find({paid: true})
            const notPaidQuestionnaire = await Questionnaire.find({paid: false})

            return res.status(200).json({paidQuestionnaire, notPaidQuestionnaire})

        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }

    async filterQuestionnaire(req,res){
        try{
            const alias = req.query.alias !== undefined ? req.query.alias.trim().toLowerCase() : ""
            const breed = req.query.breed !== undefined ? req.query.breed.trim().toLowerCase() : ""
            const type = req.query.type !== undefined ? req.query.type.trim().toLowerCase() : ""

            const questionnaires = await Questionnaire.find({alias: {$regex: alias}, breed: {$regex: breed}, type: {$regex: type}})

            return res.status(200).json(questionnaires)
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new QuestionnaireController()