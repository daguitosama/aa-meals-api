/** @type RequestHandler */
export function singUpHandler(req,res,next){
    console.log('singUpHandler Hit');
    res.end('lo')
}


export function singUpValidation(req,res,next){
    console.log('singUpValidation Hit');
    next();

}

export function singUpSanitation(req,res,next) {
    console.log('singUpSanitation Hit');
    next();
}
/** @type RequestHandler */
export function ipLog(req,res,next) {
    res.end(req.ip)
}