const Express=require('express')
var bodyParser=require('body-parser')
var app=new Express()
var request=require('request')
const Mongoose=require('mongoose');
const viewall="http://localhost:3000/viewall"
app.set('view engine','ejs')
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const   CinemaModel=Mongoose.model("cinemadetails",{
    name:String,
    producer:String,
    director:String,
    actor:String,
    actress:String,
    release_year:String,
    language:String,
    editor:String,
    camera:String,
    distributor:String

    
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
         // res.send(error)
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
app.get('/view',(req,res)=>{
request(viewall,(error,response,body)=>{
    var data=JSON.parse(body);
    console.log(data)
    res.render('view',{'data':data})
})
    //res.render('view',)



})
//to filter datas of single cinema
app.get('/getAcineApi/:Name1',(req,res)=>{
    var cname=req.params.Name1;
    EmployeeModel.find({name:cname},(error,data)=>{
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
app.get('/searchapi/ename',(req,res)=>{
    var id=req.params.ename;
})
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running")
})
