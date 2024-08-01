const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./appError');
app.use(morgan('common'))

// app.use((req, res, next) => {
//     console.log(req.method.toUpperCase()) 
// })

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs',(req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    next();
})

const verifyPassword = (req, res, next) => {
    const { password }= req.query
    if (password === 'Godislove') {
        next();
    }
    throw new AppError('password required', 401);
    // res.send('sorry you need a password')
    // throw new AppError(401, 'password required')
}

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Home Page!')
})

app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('This is a secret page')
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin to view this page', 403)
})

app.use((req, res) => {
    res.status(404).send('Page Not Found')
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})