import { verify } from "jsonwebtoken";

const getUserID = (token: string) => {
  // if(!token)  throw new Error('No token provided')

  try {
    const payload: any = verify(token, process.env.JWT_SECRET || "");
    console.log(`payload is ${payload.sub}`);
    if(!payload.sub) throw new Error ('Invalid token supplied')
    
    return payload.sub;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};
export default getUserID;
