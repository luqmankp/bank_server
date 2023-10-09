//import dataservise file
const dataservise = require("./service/dataservice")

//import cors
const cors = require("cors")

//import json web token
const jwt = require('jsonwebtoken')

//import express

const express = require("express")

//create app using express
const app = express()

//connection string to frontend integration
app.use(cors({origin:'http://localhost:4200'}))

//to parse json data from req body
app.use(express.json())

//middleware
const jwtMiddleware = (req, res, next) => {

    try {
        const token = req.headers['access_token']  //.body.token

        //verfy token
        const data = jwt.verify(token, "superkey123")

        console.log(data);

        next()
    } catch {
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'plese try login again'
        })
    }
}

//register  -post
app.post('/register', (req, res) => {

    dataservise.register(req.body.uname, req.body.acno, req.body.psw).then(result=>{

        //convert object to json and send as response
    res.status(result.statusCode).json(result)

    })

    
    // console.log(req.body);
    // res.send('success')
})


//login  -get

app.post('/login', (req, res) => {

    dataservise.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })

   

})

//deposit  -post
app.post('/deposit', jwtMiddleware, (req, res) => {

    dataservise.deposit(req.body.acnum, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })

   

})
//withdraw -post
app.post('/withdraw', jwtMiddleware, (req, res) => {

    dataservise.withdraw(req.body.acnum, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })

    

})


//getTransaction
app.post('/transaction', jwtMiddleware, (req, res) => {

    dataservise.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })

   

})

//delete
app.delete('/delete/:acno',jwtMiddleware,(req,res)=>{

   // when delete is used data is passed as params not in header or body

dataservise.deleteAcc(req.params.acno).then(result=>{
    res.status(result.statusCode).json(result)
})

})     


//create port 

app.listen(3000, () => { console.log("server started at port number 3000"); })









// // import dataservive file
// const dataService = require('./service/dataservice')


// // import cors
// const cors = require("cors")


// // import json web token
// const jwt = require('jsonwebtoken')


// // import express
// const express = require("express")


// // create app using express
// const app = express()


// // connection string to frontend integration
// app.use(cors({ origin: 'http://localhost:4200' }))


// // to parse json data from request
// app.use(express.json())


// // middleware
// const jwtmiddleware = (req, res, next) => {
//     try {
//         const token = req.headers['access_token']

//         //verify token
//         const data = jwt.verify(token, "supersecretkey123")
//         console.log(data);
//         next()
//     }
//     catch {
//         res.status(422).json({
//             statusCode: 422,
//             status: false,
//             message: 'please login'
//         })
//     }
// }


// // register  -post
// app.post('/register', (req, res) => {

//     dataService.register(req.body.uname, req.body.acno, req.body.psw).then(result => {
//         // convert object to json and send as response
//         res.status(result.statusCode).json(result)
//     })

//     // res.send("success")

// })


// // login

// app.post('/login', (req, res) => {

//     dataService.login(req.body.acno, req.body.psw).then(result => {
//         res.status(result.statusCode).json(result)
//     })


// })




// // deposit
// app.post('/deposit', jwtmiddleware, (req, res) => {

//     dataService.deposit(req.body.acnum, req.body.password, req.body.amount).then(result => {

//         // convert object to json and send as response
//         res.status(result.statusCode).json(result)
//     })



// })

// // withdraw
// app.post('/withdraw', jwtmiddleware, (req, res) => {

//     dataService.withdraw(req.body.acnum, req.body.password, req.body.amount).then(result => {
//         // convert object to json and send as response
//         res.status(result.statusCode).json(result)
//     })

// })

// // getTransaction
// app.post('/transaction', jwtmiddleware, (req, res) => {

//     dataService.getTransaction(req.body.acno).then(result => {

//         // convert object to json and send as response
//         res.status(result.statusCode).json(result)

//     })
// })

// // delete


// // // request
// // app.get('/',(req,res)=>{
// //     res.send('get method..123')
// // })

// // app.post('/',(req,res)=>{
// //     res.send('post method..123')
// // })

// // app.put('/',(req,res)=>{
// //     res.send('put method')
// // })

// // app.patch('/',(req,res)=>{
// //     res.send('patch method')
// // })

// // app.delete('/',(req,res)=>{
// //     res.send('delete method')
// // })


// //  create port
// app.listen(3000, () => { console.log("server started at port number 3000"); })