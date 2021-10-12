const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

class AuthController{
    async register(req,res){
        try {
            const candidate = await User.findOne({  $or: [ { email: req.body.email }, { phone: req.body.phone } ]  })
            if (candidate) {
                return res.json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 12)

            const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                phone: req.body.phone,
                email: req.body.email,
                password: hashedPassword,
                registerDate: parseInt(Date.now().toString())
            })
            await user.save()
            return res.status(200).json({message: 'Пользователь создан!'})
        }
        catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async login(req,res){
        try {
            const {emailOrPhone, password} = req.body

            let user = {}

            let type = 'phone'
            let field = emailOrPhone

            if(emailOrPhone && emailOrPhone.includes('@') || emailOrPhone.includes('.')){
                type = 'email'
            }
            else if(emailOrPhone){
                field = emailOrPhone.slice(1,emailOrPhone.length)
                Array(field).forEach((item) => {
                    if(isNaN(item)){
                        return res.status(400).json({error: 'Incorrect data'})
                    }
                })
            }

            user = type === 'email' ? await User.findOne({email: emailOrPhone}) :
                await User.findOne({phone: emailOrPhone})

            if(!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message:'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret')
            )
            return res.status(200).send({token, userId: user.id})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new AuthController()