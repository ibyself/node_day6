let express=require('express');
let db=require('./db');
let loginRegister=require('./router/loginRegister');
let UIRouter=require('./router/UIRouter');

const  PORT=3000;
let app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');
db
    .then(()=>{
        app.use(loginRegister);
        app.use(UIRouter);
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(PORT,(err)=>{
    if(!err) console.log(`服务器启动成功了，端口号为：${PORT}`);
    else console.log(err);
})