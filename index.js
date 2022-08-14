const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');


const app = express();

// const logger = (req, res, next) => {
//     console.log('hello');
//      next();
// };
// app.use(logger); 

//* Init middleware*//
// app.use(logger);

//*Handlebar middleware *//
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


//* Body parser middleware *//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  

//Homepage Router//
app.get('/',(req, res) => res.render('index',{title: 'Member App', members}));
 


// app.get('/', (req, res) => {
//     // res.send('<h1>Hello World!! <h1>')
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


//* Set static folder *//

app.use(express.static(path.join(__dirname, 'public')));

//*members API Routers*//
app.use('/api/members', require('./router/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));