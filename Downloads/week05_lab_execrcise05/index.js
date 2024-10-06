const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
app.use(express.json());

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
    </head>
    <body>
        <h1>Welcome to ExpressJs Tutorial</h1>
    </body>
    </html>
  `);
});
/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  fs.readFile('./user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading user data');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('./user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading user data');
    } else {
      const user = JSON.parse(data);
      if (username !== user.username) {
        res.json({ status: false, message: 'User Name is invalid' });
      } else if (password !== user.password) {
        res.json({ status: false, message: 'Password is invalid' });
      } else {
        res.json({ status: true, message: 'User Is valid' });
      }
    }
  });
});


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  const username = req.query.username || 'User';
  res.send(`<b>${username} successfully logged out.</b>`);
});


/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.port || 8083);

console.log('Web Server is listening at port '+ (process.env.port || 8081));