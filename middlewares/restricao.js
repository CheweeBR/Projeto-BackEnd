
const teste = 0;

const verificaPermissao = (req, res, next) => {
    if(req.body.permissao == process.env.TYPEA || req.body.permissao == process.env.TYPEB || req.body.permissao == process.env.TYPEDefault){
        next();
    } else {
        res.status(401).json({ msg: `Permissão inválida.` });
    }
}

module.exports = {verificaPermissao,};