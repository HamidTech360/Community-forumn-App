import joi from 'joi-browser'

export const validateUser = (payload:any)=>{
    const schema = {
        email:joi.string().email(),
        image:joi.any()
    }
    return joi.validate(payload, schema)
}