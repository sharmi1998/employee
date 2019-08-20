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
const   EmployeeModel=Mongoose.model("empdetails",{
    name:String,
    des:String,
    salary:String
    
});
Mongoose.connect("mongodb+srv://sharmi1998:SHARMI438@</password>@clusterdata-rwxfj.mongodb.net/test?retryWrites=true&w=majority")
app.get('/',(req,res)=>{
    res.render('home')
    
})
app.post('/read',(req,res)=>{

    console.log('test')
    console.log(req.body)
    var employee=new EmployeeModel(req.body);
    var result=employee.save((error)=>{
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

result=EmployeeModel.find((error,data)=>{
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
//to filter datas of single employee
app.get('/getAempApi/:Name1',(req,res)=>{
    var ename=req.params.Name1;
    EmployeeModel.find({name:ename},(error,data)=>{
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
