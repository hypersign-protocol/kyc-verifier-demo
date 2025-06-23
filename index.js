const express = require('express')
const path = require('path')
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('index.html')
})
app.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'))
})

app.listen(6006, () => {
    console.log('listening on port 6006')
})

