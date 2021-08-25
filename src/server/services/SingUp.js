/** @type RequestHandler */
export function singUpHandler(req,res,next){
    console.log('singUpHandler Hit');
    res.
}


export function singUpValidation(req,res,next){
    console.log('singUpValidation Hit');
    next();

}

export function singUpSanitation(req,res,next) {
    console.log('singUpSanitation Hit');
    next();

    
}