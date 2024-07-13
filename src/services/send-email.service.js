import nodemailer from 'nodemailer';




export const sendEmailService = async({
    to="",
    subject="",
    textMessage="",
    htmlMessage="",
    attachments=[]

}={})=>{
    //transporter configuration 
    const transporter = nodemailer.createTransport({
        host: "localhost",
        service :"gmail",
        port: 587,
        secure:false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },

    })


     //message configuration 
   const info =  await transporter.sendMail({
        from: `from ${process.env.EMAIL_USER}`,
        to,
        subject,
        text:textMessage,
        html:htmlMessage,
        attachments,
     })
return info ;

}