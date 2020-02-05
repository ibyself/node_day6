let {Router} =require('express');
let {resolve}=require('path');
let cookieParser=require('cookie-parser');
let usersModel=require('../model/users');
let router=new Router();
router.use(cookieParser());
router.get('/register',(req,res)=>{
   res.render('register',{errMsg:{}});
});
router.get('/login',(req,res)=>{
    let {email}=req.query;
    res.render('login',{errMsg:{email}});
});
router.get('/userCenter',async(req,res)=>{
    let {userId}=req.cookies;
    if(userId){
        let result=await usersModel.findOne({_id:userId});
        if(result){
            res.render('userCenter',{userName:result.user_name});
        }else{
            res.redirect('/login');
        }
    }else{
        res.redirect('/login');
    }

});
module.exports=router;