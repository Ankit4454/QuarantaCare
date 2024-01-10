const nodemailer = require('../config/nodemailer');

exports.newResetPassword = async (user)=> {
    try{
        let htmlString = await nodemailer.renderTemplate({user: user}, '/new_resetPassword.ejs');

        nodemailer.transporter.sendMail({
            from: process.env.EMAIL_QC,
            to: user.user.email,
            subject: "QuarantaCare | Reset Password",
            html: htmlString
    
        }, (err, info)=> {
            if (err){
                console.log('error in sending mail', err);
                return;
            }
        });
    } catch(err){
        console.log('error in rendering template', err);
    }
}