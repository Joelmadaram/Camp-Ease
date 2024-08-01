const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'))

// app.use((req, res, next) => {
//     console.log(req.method.toUpperCase()) 
// })

app.use('/dogs',(req, res, next) => {
    console.log('I Love dogs')
    next();
})

app.use((req, res, next) => {
    const { password }= req.query
    if (password === 'Godislove') {
        next();
    }
    res.send('sorry you need a password')
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.get('/dogs', (req, res) => {
    res.send('HOME PAGE!');
})

app.use((req, res) => {
    res.status(404).send('Page Not Found')
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})