// Fast, unopinionated, minimalist web framework for node.
const express = require('express');
// Parse incoming request bodies in a middleware before your handlers, available under the
const bodyParser = require('body-parser');
// Send e-mails from Node.js – easy as cake! 🍰✉️
const nodemailer = require('nodemailer');
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors');





const app = express();



require('dotenv').config();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());





// POST ROUTE FOR POST DATA TO SERVER
app.post('/mail', async (req, res, next) => {
    // DESTRUCTURING VARIABLE AND SETTING IT WITH DIFFERENT NAME
    let { email, subject, text } = req.body;
    // console.log(mailContent);



     // create reusable transporter object using the default transport
    let transporter = nodemailer.createTransport({
        // host: "localhost",
        service: "gmail",
        port: 465, 
        secure: false, // true for 465, false for other ports
        auth: {
            // SENDER EMAIL AND PASSWORD
            user: process.env.EMAIL,   // generated ethereal user
            pass: process.env.PASSWORD   // generated ethereal password
        }
    });



    const message = {
        // SENDER MAIL
        from: process.env.EMAIL,
        //  REVICER MAIL
        // to: "mdshayon0@gmail.com",
        to: email,
        subject: subject,
        text: text,
        html: "<p>HTML version of the message</p>"
    };



    try {
        // send mail with defined transport object
        let info = await transporter.sendMail(message);
        res.status(200).json({
            "Message": message
        });
        console.log(info);
    } catch (error){
        res.send(error);
        console.log("error: ", error);
    }
    transporter.close();

});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("server is running on " + PORT));