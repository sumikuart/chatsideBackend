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
        type:String
    },

    user_timeout:{
        // Se i docs under timeout ide. for et forslag på at lave en timeout funktion
        // måske Date + react moment
        type:Boolean
    },
    user_banned:{
        type:Boolean
    },
    user_verified:{
        type:Boolean
    },
    user_online:{
        type:Boolean
    }

    //lav statestik model typer
})


module.exports = mongoose.model('User', UserModel)


