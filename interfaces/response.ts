export interface IResponse {
    response:{
        msg: string | any,
        ok: boolean,
        data?: any,
        token?: string
    },
    statusCode: number
}