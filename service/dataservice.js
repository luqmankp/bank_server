const jwt = require('jsonwebtoken')
const db = require('./db.js')

// userDetails = {
//   1000: { acno: 1000, username: "anu", password: "abc123", balance: 0, transaction: [] },
//   1001: { acno: 1001, username: "amal", password: "abc123", balance: 0, transaction: [] },
//   1003: { acno: 1003, username: "arun", password: "abc123", balance: 0, transaction: [] },
//   1004: { acno: 1004, username: "akhil", password: "abc123", balance: 0, transaction: [] }
// }

register = (uname, acno, psw) => {
  // if (acno in userDetails) {

  return db.User.findOne({ acno }).then(user => {     //use .then cos its asynchronus function 

    if (user) {
      return {
        status: false,
        message: 'user already exist',
        statusCode: 401
      }

    } else {
      //create a new user object in db

      const newuser = new db.User({
        acno, username: uname, password: psw, balance: 0, transaction: []
      })

      //to save in db
      newuser.save()

      return {
        status: true,
        message: 'register success',
        statusCode: 200
      }

    }

  })
}


login = (acno, psw) => {

  // if (acno in userDetails) {

  return db.User.findOne({ acno, password: psw }).then(user => {
    if (user) {
      currentUser = user.username
      currentAcno = acno

      const token = jwt.sign({ currentAcno }, "superkey123")

      return {
        status: true,
        message: 'login success',
        statusCode: 200,
        currentUser,
        currentAcno,
        token

      }
    } else {
      return {
        status: false,
        message: 'incorrect account number or password',
        statusCode: 401
      }

    }
  })
  // if (psw == userDetails[acno]["password"]) {

}

deposit = (acnum, password, amount) => {
  //to convert string into number
  var amnt = parseInt(amount)
  return db.User.findOne({ acno: acnum, password }).then(user => {

    if (user) {
      //update balace
      user.balance += amnt
      //transaction data storage
      user.transaction.push({ Type: "Credit", amount: amnt })

      //to save data 
      user.save()

      return {
        status: true,
        message: `${amnt} has been credited , current balance is ${user.balance}`,
        statusCode: 200
      }

    } else {

      return {
        status: false,
        message: 'incorrect account number or password',
        statusCode: 401
      }

    }


  })
}

// if (password == userDetails[acnum]["password"]) {


withdraw = (acnum, password, amount) => {

  //to convert string into number
  var amnt = parseInt(amount)

  return db.User.findOne({ acno: acnum, password }).then(user => {

    if (user) {
      if (amnt <= user.balance) {
        user.balance -= amnt
        user.transaction.push({ Type: "Debit", amount: amnt })
        user.save()
        return {
          status: true,
          message: `${amnt} has been debited ,current balance is ${user.balance}`,
          statusCode: 200
        }
      } else {
        return {
          status: false,
          message: 'insufficient balance',
          statusCode: 401
        }
      }
    } else {

      return {
        status: false,
        message: 'incorrect account number or password',
        statusCode: 401
      }
    }

  })
}


getTransaction = (acno) => {
  return db.User.findOne({ acno }).then(user => {

    if (user) {
      return {
        status: true,
        statusCode: 200,
        transaction: user.transaction
      }
    }
  })
}

deleteAcc=(acno)=>{
  return db.User.deleteOne({acno}).then(user =>{
    if(user){
      return {
        status:true,
        statusCode:200,
        message:'account deleted'
      }
    }else{
      return{
        status:false,
        statusCode:401,
        message:'account not deleted pls try again'
      }
    }
  })
}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc 
}






// const jwt = require('jsonwebtoken')

// const db = require('./db.js')

// // userDetails = {
// //     1000: { acno: 1000, username: "anu", password: "abc123", balance: 0, transaction: [] },
// //     1001: { acno: 1001, username: "amal", password: "abc123", balance: 0, transaction: [] },
// //     1003: { acno: 1003, username: "arun", password: "abc123", balance: 0, transaction: [] },
// //     1004: { acno: 1004, username: "akil", password: "abc123", balance: 0, transaction: [] }
// // }



// register = (uname, acno, psw) => {
//     // if (acno in userDetails) {

//     return db.User.findOne({ acno }).then(user => {     //use .then cos its asynchronus function 

//         if (user) {
//             return {
//                 status: false,
//                 message: 'user already exist',
//                 statusCode: 401
//             }
//         }
//         else {
//             //create a new user object in db

//             const newuser = new db.User({
//                 acno, username: uname, password: psw, balance: 0, transaction: []
//             })

//             //to save in db
//             newuser.save()

//             return {
//                 status: true,
//                 message: 'register success',
//                 statusCode: 200
//             }

//         }

//     })
// }


// // login = (acno, psw) => {

// //     // if (acno in userDetails) {
  
// //     return db.User.findOne({ acno, password: psw }).then(user => {
// //       if (user) {
// //         currentUser = user.username
// //         currentAcno = acno
  
// //         const token = jwt.sign({ currentAcno }, "superkey123")
  
// //         return {
// //           status: true,
// //           message: 'login success',
// //           statusCode: 200,
// //           currentUser,
// //           currentAcno,
// //           token
  
// //         }
// //       } else {
// //         return {
// //           status: false,
// //           message: 'incorrect account number or password',
// //           statusCode: 401
// //         }
  
// //       }
// //     })
// //     // if (psw == userDetails[acno]["password"]) {
  
// //   }

// login = (acno, psw) => {

//     // if (acno in userDetails) {
  
//     return db.User.findOne({ acno, password: psw }).then(user => {
//       if (user) {
//         currentUser = user.username
//         currentAcno = acno
  
//         const token = jwt.sign({ currentAcno }, "superkey123")
  
//         return {
//           status: true,
//           message: 'login success',
//           statusCode: 200,
//           currentAcno ,
//           currentUser,
//           token
  
//         }
//       } else {
//         return {
//           status: false,
//           message: 'incorrect account number or password',
//           statusCode: 401
//         }
  
//       }
//     })
//     // if (psw == userDetails[acno]["password"]) {
  
//   }


//   deposit = (acnum, password, amount) => {
//     //to convert string into number
//     var amnt = parseInt(amount)
//     return db.User.findOne({ acno: acnum, password }).then(user => {
  
//       if (user) {
//         //update balace
//         user.balance += amnt
//         //transaction data storage
//         user.transaction.push({ Type: "Credit", amount: amnt })
  
//         //to save data 
//         user.save()
  
//         return {
//           status: true,
//           message: `${amnt} has been credited , current balance is ${user.balance}`,
//           statusCode: 200
//         }
  
//       } else {
  
//         return {
//           status: false,
//           message: 'incorrect account number or password',
//           statusCode: 401
//         }
  
//       }
  
  
//     })
//   }



// withdraw = (acnum, password, amount) => {

//     // convert string amount to number
//     var amnt = parseInt(amount)

//     return db.User.findOne({ acno: acnum, password }).then(user => {
//         if (user) {
//             if (amnt <= user.balance) {
//                 user.balance -=
//                     user.transaction.push({ Type: "DEBIT", amount: amnt })
//                 user.save()
//                 return {
//                     status: true,
//                     message: `${amnt} is debited to your account and the balance is ${user.balance}`,
//                     statusCode: 200
//                 }
//             }

//             else {
//                 return {
//                     status: false,
//                     message: 'insufficient balance',
//                     statusCode: 401
//                 }
//             }
//         }

//         else {
//             return {
//                 status: false,
//                 message: 'incorrect password or account number',
//                 statusCode: 401
//             }
//         }
//     })
// }



// getTransaction = (acno) => {
//     return db.User.findOne({ acno }).then(user => {
//         if (user) {
//             return {
//                 status: true,
//                 statusCode: 200,
//                 transaction: user.transaction
//             }
//         }
//     })
// }


// module.exports = {
//     register, login, deposit, withdraw, getTransaction
// }

