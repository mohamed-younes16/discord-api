
const allowedlist =  [
    "https://discord-clone-phi-one.vercel.app",
"http://localhost:3000",
"https://discord-clone-pro.up.railway.app"]

const allowedHeaders = (origin,call)=>{

allowedlist.includes(origin) || !origin ?call(null , true):
call(new Error("do i know you ?"))
}


module.exports = allowedHeaders 

module.exports.allowedlist = allowedlist; 