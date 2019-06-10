
const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const cors = require('cors');
const PORT = 4040
const mongoose = require('mongoose')
const myRouter = express.Router();

app.use(cors());
app.use(bodyparser.json());

app.listen(PORT, function(){
    console.log('Server is running on: ' + PORT)
})


mongoose.connect('mongodb://127.0.0.1:27017/praktisk_web_chat_db', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function(){
    console.log('Connection Done')
})


let UserModel = require('./models/user_db_model.js');

app.use('', myRouter);


// ------------------------------------------------------------------------------------ USER Endpoints:

// ----Opret: 
myRouter.route('/newuser').post(function(req, res){

    let user = new UserModel (req.body);

    user.save().then(user => {
        res.status(200).json('User added')
    }).catch(err =>{
        res.status(400).send('an error in newuser has accurd')
    })
})



//---- Redigere bruger efter id
myRouter.route('/edit/:id').put(function(req, res){

    UserModel.findById(req.params.id, function(err, currentUser){

        if(!currentUser){
            res.status(400).send('an Error has accured in -edit/:id- endpoint(get id part)')
        } else {
            currentUser.user_name = req.body.user_name
            currentUser.user_mail = req.body.user_mail
            currentUser.user_password = req.body.user_password
            currentUser.user_type = req.body.user_type
            currentUser.user_timeout = req.body.user_timeout
            currentUser.user_banned = req.body.user_banned
            currentUser.user_verified = req.body.user_verified
            currentUser.user_online = req.body.user_online

            currentUser.save().then(currentUser =>{
                res.json('User Updated')
            }).catch(err => {
                res.status(400).send('an Error has accured in -update/id- endpoint(update value part)')
            })
        }
    })

})



// ----------Get user by id.
myRouter.route('/user/:id').get(function(req, res){
    let id=req.params.id;

    UserModel.findById(id, function(err, currentUser){
        if(err){
            console.log('an Error has accured in -id- endpoint')
        } else {
            res.json(currentUser)
        }
    })
})


//------------Delete user: 


myRouter.delete('/delete/:id', function(req, res){
    UserModel.findByIdAndRemove(req.params.id, (err, user) => {
        if(err){
            console.log('An Error has accurd in -delete/id- user endpoint');
            return res.status(500).send('an Error has accured in status(500) in-delete/id- endpoint(delete part)')
        }

        const response ={
            massage: "User is deleted",
            id:user._id
        }

        return res.status(200).send(response)
    })
})

// ----------------------------------------------------------------------lists

//------Get everyone
myRouter.route('/completelist').get(function(req, res){

    UserModel.find(function(err, Users){
        if(err){
            console.log('An error has accurd at userList find')
        } else {
            res.json(Users)
        }
    })
})


// -----------Get all Admins:
myRouter.route('/adminlist').get(function(req,res){

    UserModel.find({"user_type": "admin"}  ,function(err, currentUser){
        if(err){
            console.log('an Error has accured in -get all admins- endpoint')
        } else {
            res.json(currentUser)
        }

    })
 
})

// -----------Get all Users:
myRouter.route('/userlist').get(function(req,res){

    UserModel.find({"user_type": "user"}  ,function(err, currentUser){
        if(err){
            console.log('an Error has accured in -get all users- endpoint')
        } else {
            res.json(currentUser)
        }

    })
 
})


// -----------Get all banned Users:
myRouter.route('/banlist').get(function(req,res){

    UserModel.find({"user_banned": "true"}  ,function(err, currentUser){
        if(err){
            console.log('an Error has accured in -get all banned users- endpoint')
        } else {
            res.json(currentUser)
        }

    })
 
})




// -----------Get all timeout Users:
myRouter.route('/timeoutlist').get(function(req,res){

    UserModel.find({"user_timeout": "true"}  ,function(err, currentUser){
        if(err){
            console.log('an Error has accured in -get all timeout users- endpoint')
        } else {
            res.json(currentUser)
        }

    })
 
})

// -----------Get all Online Users:
myRouter.route('/onlineuserlist').get(function(req,res){

    UserModel.find({"user_online": "true"}  ,function(err, currentUser){
        if(err){
            console.log('an Error has accured in -get all online users- endpoint')
        } else {
            res.json(currentUser)
        }

    })
 
})


