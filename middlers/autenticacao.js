const registroUsuario = (req, res, next) => {
    if(req.body.user && req.body.password && req.body.password2){
        if(req.body.password === req.body.password2) {
            
        }
    } else{
        res.status(401).json({ msg: `Os campos estão vazios.` });
    }
    const user = new Usuario({ 
        user: req.body.user,
        password: req.body.password,
        type: 'LEITOR'
    });
    
}