//İmport ettiğin kutuphanelerin ne ise yaradıgınıda yazar mısın?

//Ok yazarımmm:)

import express from "express";  // web sunucu çatısı gelen istek yöntemlerine göre işlem yapar
import dotenv from 'dotenv';  //.env dosyasında değişkenleri tutup onu kolayca ulaşmamızı sağlar
import conn from './db.js';   //veritabanı bağlantısı
import cookieParser from "cookie-parser";  // oluşturulan token bilgisini almmak ve kaydetmek
import pageRoute from './routes/pageRoute.js';   //Url yönlendirmesi
import photoRoute from './routes/photoRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

//connection to the DB
conn()

const app = express()

const port = process.env.PORT

//ejs template engine
app.set("view engine","ejs")

//static files middleware
app.use(express.static('public'));
app.use(express.json()) //post işlemlerinde body de çalışan json verileri alabilmek
app.use(express.urlencoded({extended : true})) //form alanlarındaki verileri alabilmek 
app.use(cookieParser());
//routes
app.use('/',pageRoute);
app.use('/photos',photoRoute);
app.use('/users',userRoute);



// app.get("/", (req,res)=>{
//     res.render("index")
// });

// app.get("/about", (req,res)=>{
//     res.render("about")
// });

app.listen(port , ()=>{
    console.log(`Uygulamada çalışacak port: ${port}`);
});
