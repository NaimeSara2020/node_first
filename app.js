//İmport ettiğin kutuphanelerin ne ise yaradıgınıda yazar mısın?

//Ok yazarımmm:)

import express from "express";  // web sunucu çatısı gelen istek yöntemlerine göre işlem yapar
import dotenv from 'dotenv';  //.env dosyasında değişkenleri tutup onu kolayca ulaşmamızı sağlar
import conn from './db.js';   //veritabanı bağlantısı
import pageRoute from './routes/pageRoute.js';   //Url yönlendirmesi

dotenv.config();

//connection to the DB
conn()

const app = express()

const port = process.env.PORT

//ejs template engine
app.set("view engine","ejs")

//static files middleware
app.use(express.static('public'))

//routes
app.use('/',pageRoute)

// app.get("/", (req,res)=>{
//     res.render("index")
// });

// app.get("/about", (req,res)=>{
//     res.render("about")
// });

app.listen(port , ()=>{
    console.log(`Uygulamada çalışacak port: ${port}`);
});
