let {Router}=require('express');
let sha1=require('sha1');
let router=new Router();
let usersModel=require('../model/users');
//注册路由
router.post('/register',async(req,res)=>{
    let {email,user_name,password,re_password}=req.body;
    let emailReg=/^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/;
    let userNameReg=/^[a-zA-Z0-9_]{5,16}$/;
    let passwordReg=/^[a-zA-Z0-9_@#!]{6,20}$/;
    let errMsg={};
    if(!emailReg.test(email)){
        errMsg.emailErr='邮箱输入不合法';
    }
    if(!userNameReg.test(user_name)){
        errMsg.userNameErr='姓名输入不合法';
    }
    if(!passwordReg.test(password)){
       errMsg.passwordErr='密码输入不合法';
    }
    if(password!==re_password){
        errMsg.rePasswordErr='两次密码输入不一致';
    }
    if(JSON.stringify(errMsg)!=='{}'){
        res.render('register',{errMsg});
        return;
    }
    try{
        let findResult=await usersModel.findOne({email});
        if(findResult){
            errMsg.emailErr=`${email}邮箱已经注册过,不能重复注册`;
            res.render('register',{errMsg});
            return;
        }else{
            await usersModel.create({email,user_name,password:sha1(password)});
            res.redirect(`/login?email=${email}`);
        }
    }catch{
        errMsg.registerErr=`${email}邮箱已经注册过,不能重复注册`;
        res.render('register',{errMsg});
    }
});

//登录路由
router.post('/login',async(req,res)=>{
   let {email,password}=req.body;
   let emailReg=/^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/;
   let passwordReg=/^[a-zA-Z0-9_!@#$]{5,16}$/;
   let errMsg={};
   if(!emailReg.test(email)){
       errMsg.emailErr='邮箱输入不合法';
   }
   if(!passwordReg.test(password)){
       errMsg.passwordErr='密码输入不合法';
   }
   if(JSON.stringify(errMsg)!=='{}'){
       res.render('login',{errMsg});
       return;
   }
   try{
       let findResult=await usersModel.findOne({email,password:sha1(password)});
       if(findResult){
          let userId=findResult._id;
          res.cookie('userId',userId.toString(),{maxAge:1000*30});
          res.redirect('/userCenter');
       }else{
        errMsg.loginErr='登录失败，邮箱或密码不正确';
        res.render('login',{errMsg});
       }

   }catch (e) {
       errMsg.networkErr = '网络不稳定，稍后再试！';
       res.render('login',{errMsg})
   }
});
module.exports=router;