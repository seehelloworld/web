const express=require('express');
const bodyParser=require('body-parser');
const fs = require('fs');
const app=express();

app.use(express.static('www'));
// 使用body-parser模块解析请求体数据
// 使用angularjs提交数据时，后台使用bodyparser.json（）解析

// 常规的表单提交是urlencodeed格式，即application/    编码后是name=list&title=project
// angular提交是以json格式提交的，编码后形式如下：{  'name':'张三' ，’title}：'前端工程师'}
// 解析json数据格式时，使用bodyparser.json（）；
app.use(bodyParser.json());
app.post('/api/card/me',(req,res)=>{
    console.log(req.body);
    var fileName= 'me.txt';
    fs.exists(fileName,(exists)=>{
        if(exists){
            // 存在
        fs.writeFile(fileName,JSON.stringify(req.body),(err,data)=>{
            res.json({code:1});
        });
        }else{
            // 不存在
            fs.appendFile(fileName,JSON.stringify(req.body),(err)=>{
                if(err){res.json({code:'error',message:'写入失败'})
            }
                else res.json({code:'succes',message:'写入成功'})
            })
        }
    })
});
app.get('/api/card/me',(req,res)=>{
    fs.readFile('me.txt',(err,data)=>{
        var datas=JSON.parse(data);
        console.log(datas);
        if(err){
            res.json(err);
        }else{
            res.json(datas);
        }
    })
});
// app.get('/api/getdata',(req,res)=>{
//     fs.readFile('me.txt',(err,data)=>{
//        var datas= JSON.parse(data)
//         res.json(datas);
//     })
// })
app.listen(3000,()=>{
    console.log('服务器启动成功了')
})
