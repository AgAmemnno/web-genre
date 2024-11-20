// Importing libraries
const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');


// Sending static files with Express 
app.use(express.static('public'));

const router = express.Router(); 

// Routing 
router.get('/', (req, res) => {
    res.render('index');
    /*
    res.render('index', {
        title: 'Oragamura',
        name: 'Carlおじさん(カールおらが村出身)',
        age: 5,
        isDisplayName: true,
        people: [
            {firstName: "Katz", lastName: "Ishimatu"},
            {firstName: "Sir", lastName: "Lancelot"},
            {firstName: "Johnson", lastName: "Johnson"},
            {firstName: "Takagi",lastName: "BÜji"},
        ],

        test: '<h3>Welcome to New Orlands</h3>',
    });
    */
});

app.use('/', router);
const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/mainLayout'), // change layout folder name
    partialsDir: path.join(__dirname, 'views/pieces'), // change partials folder name
    // create custom express handlebars helpers
    helpers: {
        calculation: function(value) {
            return value * 5;
        },

        list: function(value, options) {
            let out = "<ul>";
            for (let i = 0; i < value.length; i++) {
                out = out + "<li>" +  options.fn(value[i]) + "</li>";
            }
            return out + "</ul>";
        }
    }
});


// Express Handlebars Configuration
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.listen(9001, () => {
    console.log('Server is starting at port ', 9001);
});