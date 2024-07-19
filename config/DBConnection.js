const mongoose = require ('mongoose');

const DBConnection = ()=>{
    try {
         mongoose.connect(process.env.DB_URL);
        console.log(`Database Connected Successfully 😊`);
        
    } catch (error) {
        console.log(`Database Connection Failed 😔!`);
        process.exit(1); 
        
    }
}

module.exports = DBConnection