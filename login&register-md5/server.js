let express=require('express');
let db=require('./db');
let session=require('express-session');
let MongoStore=require('connect-mongo')(session);
let loginRegister=require('./router/loginRegister');
let UIRouter=require('./router/UIRouter');

const  PORT=3000;
let app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'userId',   //设置cookie的name，默认值是：connect.sid
    secret: 'atguigu', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否在存储内容之前创建会话
    resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化
    store: new MongoStore({
        url: 'mongodb://localhost:27017/session_container',
        touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
    }),
    cookie: {
        httpOnly: true, // 开启后前端无法通过 JS 操作cookie
        maxAge: 1000*30 // 设置cookie的过期时间
    },
}));
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