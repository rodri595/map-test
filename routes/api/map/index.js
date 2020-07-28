var express = require('express');
var router = express.Router();
var privateRouter = express.Router();
const model = require('./map.model');

const init = async () => {
    await model.initModel();
};
init();

/**************************        GETALL            **************************************/
router.get('/', async (req, res) => {
    try {
        let markers = await model.getAll();
        res.status(200).json(markers);
    } catch (err) {
        console.log(err);
        res.status(500).json({"Error": "Error at locating Markers"});
    }
});
// get /

/**************************        NEW            **************************************/
privateRouter.post('/marker', async (req, res) => {
    try {

        if (req.user.roles.includes('standard') && true) {
            var check = await model.findEmail(req.user._id, req.user.email);
            if (check == 0) {
                var {
                    latitud,
                    longitud,
                    msg
                } = req.body;
                latitud = parseFloat(latitud);
                longitud = parseFloat(longitud);
                msg = msg;
                const rslt = await model.addOne(req.user._id, req.user.email, latitud, longitud, msg);
                res.status(200).json(rslt);
            } else {
                res.status(401).json({"error": "Ya Creaste un Marcador"});
            }
        } else {
            res.status(401).json({"msg": "No esta autorizado crear un marcador"});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({"Error": "Error al crear marcador"});
    }
});
// post /new

module.exports = {
    public: router,
    private: privateRouter
}
