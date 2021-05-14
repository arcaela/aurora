const { express } = require("../../config");


express.get('/', async (req, res)=>{
    res.success("El servidor está iniciado");
});