export interface IFileUpload {
    name: string,
    data: any,
    encodeing: string,
    tempFilePath: string,
    truncated: boolean,
    mimetype: string,
    mv: Function
}