const nodemailer = require('../config/nodemailer');

exports.newContactUs = async (contact)=> {
    try{
        let htmlString = await nodemailer.renderTemplate({contact: contact}, '/new_contactUs.ejs');

        nodemailer.transporter.sendMail({
            from: 'kanteliyaankit@gmail.com',
            to: contact.email,
            subject: "Contact Us",
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