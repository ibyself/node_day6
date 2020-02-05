let express=require('express');
let cookieParser=require('cookie-parser');
let app=express();
app.use(cookieParser());
app.get('/test',(req,res)=>{
   // res.cookie('demo',123);//会话cookie
   res.cookie('demo',123,{maxAge:1000*30});//持久化cookie
   res.send('ok');

});
app.get('/test2',(req,res)=>{
    console.log(req.cookies);//获取客户端携带过来的cookie 需借助cookie-parser
    res.send('ok');
});
app.get('/test3',(req,res)=>{
    //删除cookie
    //res.cookie('demo',123,{maxAge:0});//方法一立即过期
    res.clearCookie('demo');//方法二调用删除API

    res.send('ok');
});
app.listen(3000,(err)=>{
   if(!err) console.log('服务器启动成功了');
   else console.log(err);
});