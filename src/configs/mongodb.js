const mongoose = require('mongoose');
require('dotenv').config();

module.exports = mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`DB connect success!`);
}).catch(err=>{
    console.log(`Error when trying connect: ${err}`);
})
