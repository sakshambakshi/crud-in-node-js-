const express = require('express');
const mysql = require('mysql');
const path = require('path')
const  cors = require('cors');
// const Checkroute = require('./routes/postcheck.js')



const app = express();
// let connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     database: 'foodcrud'
// });

var pool = mysql.createPool({
    connectionLimit: 10, //important
    host: 'localhost',
    user: 'root',
    database: 'foodcrud',
    debug: false
});


app.use(cors())
app.use('/' , express.static(path.join(__dirname , 'client')))
app.use(express.json());
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
// app.use(cors({origin: 'http://localhost:30001'}));

// app.use('/post' , Checkroute.Checkrouter)
// app.post('/post' , Checkroute.Checkrouter )

app.post('/post' , (req , res , err) =>{
    // console.log(Checkroute)
    console.log(req.body)
    console.log(req.body.firstName , req.body.dob , req.body.category)
    pool.getConnection((err , connection) =>{
        if(err){
            connection.release();
            console.log(1)
            res.json({ "code": 100, "status": "Error in connection database" })
        }
        const today = new Date();
        const  year = today.getFullYear();
        const userAge =   year - parseInt(req.body.dob.split('/')[0])
        
        if(req.body.firstName ==='Mukul' ){
            console.log(2); res.json({"code" : 100 , "status" : "Name can't be mukul"}) ;  return ;
}
        if(userAge <= 18 )
        {console.log(3); res.json({"code" : 100 , "status" : "Below 18  aren't allowed "}); return ;
}
        if(req.body.firstName == '' || req.body.category == '' ||req.body.dob == ''){
            console.log(4)
            res.json({"code" : 100 , "status" : "You left something "}); 
            return ;
        }

   

      

        connection.query(`INSERT INTO food( name, age, category) VALUES ('${req.body.firstName}','${req.body.dob}','${req.body.category}')` , (err , rows , fields)=>{
            console.log('In here')
            if(!err) {res.json({"code":200 ,  "status" :"Success"} ); connection.release();
 }           else {res.json({"code":100 ,  "status" :"Unable to send data at db"})
            connection.release();}
            } )
     
        })
  
    

    console.log('requested')
})

app.get('/all' , (req , res , next) =>{
    pool.getConnection((err , connection) =>{
        if(err){
            console.log('error @ get /all part  '); 
            res.json({'code': 100 , 'status': "Error at getting data from /all"});
            connection.release();
            }
        else {
            connection.query('SELECT * FROM food ' , (err , rows , field) =>{
                if(!err){res.json(rows) ; connection.release();}
                
            })
        }
    })
})


app.delete('/delete/:id' , (req , res , next) =>{
    // res.json({"id": req.params.id});
    const id = req.params.id ;
    console.log(typeof(id))
    pool.getConnection((err , connection ) =>{
        if(err){
            res.json({'code': 100 , 'status': "Error at forming pool deleting 1 "});
            connection.release();
        }
        else{
            console.log('Inside the else of delete route ');
            connection.query(`DELETE FROM food WHERE id = ${id} ` , (err , rows , field) =>{
                if(!err){
                    res.json({'code': 200 , 'status': 'Deleted'})
                    connection.release();
                }
                else{
                    res.json({'code': 100 , 'status': ' error while Deleting'})
                    connection.release();
                }
            })
        }
    })
})


app.put('/edit' , (req , res , next) =>{
    
    console.log(req.body);
    pool.getConnection((err , connection) =>{
        if(err){
            res.json({'code': 100 , 'status': "Error at forming pool put 1 af"});
            connection.release();
        }
        else{
            console.log('Inside put route');
            let id = parseInt(req.body.id)
            connection.query(`UPDATE food SET name = '${req.body.firstName}', age = '${req.body.dob}', category = '${req.body.category}' WHERE id = ${id} ` , (err , rows , field) =>{
                if(!err){
                    res.json({'code': 200 , 'status': 'Edited'})
                    connection.release();
                }
                else{
                    console.log(err)
                    res.send(`UPDATE food SET name =${req.body.firstName}, age = ${req.body.dob}, category = ${req.body.category} WHERE id = ${id} `);
                    console.log(`UPDATE food SET name =${req.body.firstName}, age = ${req.body.dob}, category = ${req.body.category} WHERE id = ${id} `)
                    connection.release();
                }
            })
        }

    })

} )
// UPDATE food SET name =[value-2], age = [value-3], category = [value-4] WHERE id = 

app.listen(3001 , ()=>{
    console.log('Listening at port');
})



