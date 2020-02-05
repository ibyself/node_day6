
const PORT=27017;
const DB_NAME='test2';

let mongoose=require('mongoose');
mongoose.set('useCreateIndex',true);
module.exports=new Promise((resolve,reject)=>{
    mongoose.connect(`mongodb://localhost:${PORT}/${DB_NAME}`,{ useNewUrlParser: true ,useUnifiedTopology: true});
    mongoose.connection.once('open',(err)=>{
        if(!err){
            console.log(`位于本机上的${PORT}端口的${DB_NAME}数据库连接成功了!`);
            resolve();
        }else{
            reject(err);
        }
    })
});