const mongoose = require('mongoose');
const schema = mongoose.Schema;

let UserModel = new schema({
    user_name:{
        type:String
    },
    user_mail:{
        type:String
    },
    user_password:{
        type:String
    },
    user_type:{
        // Måske dette skulle være en Number
        type:String,
        default: 'user'
    },
    user_note:{
        // bruges til at sætte admins noter på en bedstemt bruger
        type:String,
        default: '-No Notes-'
    },


    user_timeout:{
        // Se i docs under timeout ide. for et forslag på at lave en timeout funktion
        // måske Date + react moment
        type:Boolean,
        default: false
    },
    user_banned:{
        type:Boolean,
        default: false
    },

    user_verified:{
        type:Boolean,
        default: true
    },
    user_online:{
        type:Boolean,
        default: false
    }

    //lav statestik model typer
})


module.exports = mongoose.model('User', UserModel)


