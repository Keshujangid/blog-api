const express = require('express');
const app = express();
const apiRouter = require('./routes/blogRoutes');
const authRouter = require('./routes/authRoutes')
const errorHandler = require('./middleware/errorHandler')
const passport = require('./config/passport')
const cors = require('cors')


app.use(cors())
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', apiRouter);
app.use('/auth', authRouter);


app.use(errorHandler);
app.listen(process.env.PORT,()=>{console.log('Server is running on port 3000')});
