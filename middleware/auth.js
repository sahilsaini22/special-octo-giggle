const jwt = require('jsonwebtoken');
const jwtSecret1= "tl_myjwt";

function auth( req, res, next){
    const token = req.header('x_auth_token');


    if(!token)
    return
        res.status(401).json({msg: 'no token!'});
    

    try{
        //verify token 
        const decoded = jwt.verify(token, jwtSecret1);


        //Add user from payload
        req.user = decoded;
        next();
    }
    catch(e)
    {
        res.status(400).json({msg: 'invalid token'});
    }

    
}

module.export = auth;