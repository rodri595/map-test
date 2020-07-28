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

privateRouter.get('/private', (req, res) => {
    if (req.user.roles.includes('public') && true) {
        res.status(200).json({"msg": req.user});
    } else {
        res.status(401).json({"msg": "No esta autorizado a usar esta ruta"});
    }

})

module.exports = {
    public: router,
    private: privateRouter
}
