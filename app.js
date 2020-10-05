const express= require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const path = require("path");


const app = express();


app.engine('handlebars',exphbs());
app.set('view engine', 'handlebars');

app.use('/public',express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.render('form',{layout:false});
});

app.post('/send',function(req,res){
const output=`
<ul>
<li>Name: ${req.body.Name} </li>
<li>Email: ${req.body.Email}</li>
<li>Phone: ${req.body.Phone}</li>
<ul>
`;

   // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'oceane14@ethereal.email', // generated ethereal user
      pass: 'YytDU9Nf7Yhpuxmchu', // generated ethereal password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <oceane14@ethereal.email>', // sender address
      to: 'divyashasinha23@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // res.render('submit',{layout:false}, {msg:'Email has been sent'});
  });

});
app.listen(3000, function(){
  console.log("Server started at port 3000");
});
