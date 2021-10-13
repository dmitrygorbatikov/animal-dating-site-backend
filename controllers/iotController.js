

class IotController{
    async getSensorParameters(req, res){
        try{
            const temperature = (Math.random() * (38 - 32) + 32).toString().substring(0,4)
            const heartBeat = (Math.random() * (130 - 40) + 40).toString().split('.')[0]
            const geoPosition = {
                latitude: '46' + '.' + (Math.random() * (1000 - 800) + 800).toString().split('.')[0],
                longitude: '47' + '.' + (Math.random() * (1000 - 800) + 800).toString().split('.')[0],
            }
            return res.status(200).json({temperature, heartBeat, geoPosition})

        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new IotController()