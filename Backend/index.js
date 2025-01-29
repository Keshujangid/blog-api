const express = require('express');
const app = express();
const apiRouter = require('./routes/blogRoutes');
const authRouter = require('./routes/authRoutes')
const errorHandler = require('./middleware/errorHandler')
const passport = require('./config/passport')
const cors = require('cors')

const corsOptions = {
    origin: ['https://keshu-blog-frontend.netlify.app','https://blog-authors.netlify.app' ,'http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'authorization'],
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api', apiRouter);
app.use('/auth', authRouter);


app.use(errorHandler);
// app.listen(process.env.PORT,()=>{console.log('Server is running on port 3000')});
module.exports = app
