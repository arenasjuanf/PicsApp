import Token from "../classes/token";
import { IResponse } from "../interfaces/response";
import { User, IUser } from "../models/user.model";


export default class UserController {

    constructor(){}

    async create(data: Partial<IUser>): Promise<IResponse>{
        try{
            await User.create( data );
            delete data.password;
            return {
                response:{
                    msg: "it works",
                    ok: true,
                    data
                },
                statusCode: 200
            };
        }catch(err){
            return {
                response:{
                    ok: false,
                    msg: err
                },
                statusCode:500
            }
        }
    }

    async login(email: string, password: string): Promise<IResponse> {

        try{
            const userDB = await User.findOne({email}); 
            if(!userDB){
                return {
                    response:{
                        ok: false,
                        msg: "Wrong email or Password"
                    },
                    statusCode: 401
                };
            }
    
            if(userDB.comparePassword(password)){
    
                const {name, avatar, email, _id} = userDB;
    
                const userToken = Token.getJwtToken({
                    name, 
                    avatar,
                    email,
                    _id
                });
    
                return {
                    response: {
                        ok: true,
                        msg: "Logged",
                        token: userToken
                    },
                    statusCode: 200
                }
            }else{
                return {
                    response:{
                        ok: true,
                        msg: "invalid password"
                    },
                    statusCode: 401
                }
            }
        
        }
        catch(err){
            return {
                response:{
                    ok: false,
                    msg: err
                },
                statusCode:500
            }
        }
    }

    async update(uId: string, dataBody: Partial<IUser>): Promise<IResponse>{
        try{
            const userDB = await User.findByIdAndUpdate(uId, dataBody);
            
            const {_id, name, email, avatar } = userDB as IUser;
            
            return {
                response:{
                    ok: userDB ? true : false,
                    msg: userDB ? "user has been updated" : "user not found",
                    token: userDB ? Token.getJwtToken({_id, name, email, avatar }) : ''
                },
                statusCode: 200
            }


        }catch(err){
            return {
                response:{
                    ok: false,
                    msg: err
                }, 
                statusCode: 500
            };
        }

    }

    getInfo(dataToken: IUser): IResponse {
        
        return {
            response:{
                ok: true,
                msg: dataToken 
            },
            statusCode: 200
        }

    }

}