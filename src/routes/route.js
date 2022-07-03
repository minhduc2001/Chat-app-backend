const userRoute = require('./userRoute');
const messagesRoute = require('./messagesRoute');
const router = (app) =>{
    app.use('/api/auth', userRoute);
    app.use('/api/message', messagesRoute);
}

module.exports = router;