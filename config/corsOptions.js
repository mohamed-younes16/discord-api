
const allowedlist =  ["https://chat.openai.com","http://localhost:3500","https://www.youtube.com"]

const allowedHeaders = (origin,call)=>

allowedlist.includes(origin) || !origin ?call(null , true):
c(new Error("do i know you ?"))



module.exports = allowedHeaders 

module.exports.allowedlist = allowedlist;