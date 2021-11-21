const express = require('express');
const path = require('path');
const logger = require('./middleware/logger')

const app = express();

// Init middleware
app.use(logger);

// Body parse middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Traditional
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public', 'index.html'));
// })

// New method
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));