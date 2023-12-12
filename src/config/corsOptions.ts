
const allowedlist =  ["https://chat.openai.com","http://localhost:3500","https://www.youtube.com","http://localhost:3000"]

const allowedHeaders = (origin:any,call:any)=>{

allowedlist.includes(origin) || !origin ?call(null , true):
call(new Error("do i know you ?"))
}


module.exports = allowedHeaders 

module.exports.allowedlist = allowedlist;