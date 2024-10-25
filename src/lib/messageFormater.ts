export const formatMessage=(
    result:boolean,
    data?:any,
    message?:string,
    schema?:any
   
)=>{
   return {
    success: result,
    data:data,
    schema: schema,
    message:message
   }

}