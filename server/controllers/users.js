const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.login = (req,res) => {

    const { email,password } = req.body;

    if(!password || !email){
        return res
        .sendApiError({
            title:'Missing Data',
            detail:'Email or Password is Missing !'
        });
    }
    User.findOne({email},(error,foundUser)=>{
        if(error){
            return res.mongoError(error);
        }
        if(!foundUser){
            return res
            .sendApiError({
                title:'Invalid Email',
                detail:'User With Provided Email does not Exist'
            });
        }
        if(foundUser.hasSamePassword(password)){
            //GENERAT E JWT
            const token = jwt.sign({
                sub: foundUser.id,
                username: foundUser.username
            },config.JWT_SECRET,{expiresIn: '2h'})
            return res.json(token);
        }
        else{
            return res
            .sendApiError({
                title:'Invalid Email',
                detail:'User With Provided Email Does Not Exist'
            });
        }
    })
}

exports.register = (req,res) => {
    
    const { username,email,password,passwordConfirmation } = req.body;
    
    if(!password || !email){
        return res
        .sendApiError({
            title:'Missing Data',
            detail:'Email or Password is Missing !'
        });
    }
    if(password !== passwordConfirmation){
        return res
        .sendApiError({
            title:'Invalid Password',
            detail:'Password is Not Matching Confirmation Password !'
        });
    }
    User.findOne({email},(error,existingUser)=>{
        if(error){
            return res.mongoError(error);
        }
        if(existingUser){
            return res
            .sendApiError({
                title:'Invalid Email',
                detail:'User With Provided Email Already Exists !'
            });
        }
        const user = new User({username,email,password});
        user.save((error)=>{
            if(error){
                return res.mongoError(error);
            }
            return res.json({status:'Registered'});

        })
    })
}
// exports.onlyAuthUser = (req,res,next) =>{
//     const token = req.headers.authorization;
//     if(token){
//         const {decodedToken,error} = parseToken(token);
//         if(error){
//             return res.status(422).send(error); 
//         } 
//         User.findById(decodedToken.sub,(error,foundUser)=>{
//             if(error){
//                 return res.status(422).send({errors:[{title:'DB error',detail:'oops something happened'}]})
//             }
//             if(foundUser){
//                 res.locals.user = foundUser;
//                 next();
//             }
//             else{
//                 return notAuthorized(res);
//             }
//         })
//     }
//     else{
//         return notAuthorized(res);
//     }
// }

exports.onlyAuthUser = (req,res,next) =>{
    const token = req.headers.authorization;

    if(token){
        const decodedToken = parseToken(token);
        if(!decodedToken){
            return notAuthorized(res);
        }

        User.findById(decodedToken.sub,(error,foundUser)=>{
            if(error){
                return res.mongoError(error);
            }
            if(foundUser){
                res.locals.user = foundUser;
                next();
            }else{
                return notAuthorized(res);
            }
        })
    }else{
        return notAuthorized(res);
    } 
}
function parseToken(token){
     try{
         return jwt.verify(token.split(' ')[1],config.JWT_SECRET);
         //return {decodedToken} 
     }
     catch(error){
         return null;
     }
    //return jwt.verify(token.split(' ')[1],config.JWT_SECRET) || null;
    
}

function notAuthorized(res){ 
    return res
    .status(401)
    .send({errors:[{title:'Not Authorized',detail:'You Need To Login To Get Access'}]})
}
// exports.onlyAuthUser = (req,res,next) =>{
//     const token = req.headers.authorization;
//     if(token){
//         const decodedToken = parseToken(token);
//         if(!decodedToken){
//             return notAuthorized(res);
//         }
//         else{
//         return notAuthorized(res);
//     }
// }

// function parseToken(token){
//     return jwt.verify(token.split(' ')[1],config.JWT_SECRET) || null;
// }

// function notAuthorized(res){
//     return res
//     .status(401)
//     .send({errors:
//         [{title:'Not Authorized!',detail:'you need to login to get access'}]})
// }