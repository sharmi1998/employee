const Express=require('express')
var bodyParser=require('body-parser')
var app=new Express()
var request=require('request')
const Mongoose=require('mongoose');
app.set('view engine','ejs')
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const   CinemaModel=Mongoose.model("cinemas",{
    name:String,
    pro:String,
    dir:String,
    act:String,
    actr:String,
    year:String,
    lan:String,
    edi:String,
    cam:String,
    dis:String

    
});
Mongoose.connect("mongodb://localhost:27017/cinemadb")
app.get('/',(req,res)=>{
    res.render('home')
    
})
app.post('/read',(req,res)=>{

    console.log('test')
    console.log(req.body)
    var cinema=new CinemaModel(req.body);
    var result=cinema.save((error)=>{
        if(error){
            throw error;
         
        }
        else{
            res.send("<script> window.location.href='/' </script>");
        }
    })

})



app.get('/viewall',(req,res)=>{

result=CinemaModel.find((error,data)=>{
    if(error){
        throw error;
    }
    else{
        res.send(data);
    }
})

})
const viewall="http://localhost:3002/viewall"

app.get('/view',(req,res)=>{
    request(viewall,(error,response,body)=>{
        var data=JSON.parse(body);
        console.log(data)
        res.render('view',{'data':data})
    })
    
    })
//to filter datas of single cinema
app.get('/getAcineApi/:Name1',(req,res)=>{
    var cname=req.params.Name1;
    CinemaModel.find({name:cname},(error,data)=>{
        if(error){
            throw error;
        }
        else{
            res.send(data)
        }
    })
})

app.get('/search',(req,res)=>{
    res.render('search')
})
app.get('/searchapi/name',(req,res)=>{
    var cname=req.body.name;
    CinemaModel.find({name:cname},(error,data)=>{
        if(error){
            throw error;
        }
        else{
            res.send(data)
        } 
    })
})
app.listen(process.env.PORT || 3002,()=>{
    console.log("Server is running")
})
