const express = require("express");
const app = express();
//const cookieParser = require('cookie-parser');
const PORT = 3000; // default port 8080

app.set("view engine", "ejs")


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
    userRandomID: {
      id: "userRandomID",
      email: "user@example.com",
      password: "purple-monkey-dinosaur",
    },
    user2RandomID: {
      id: "user2RandomID",
      email: "user2@example.com",
      password: "dishwasher-funk",
    },
  };

//app.use(cookieParser())


app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
    res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
    const templateVars = {
        urls: urlDatabase,
    };
    res.render("urls_index", templateVars);
  });

app.use(express.urlencoded({ extended: true }));



const generateRandomString = function() {

}
app.get("/", (req, res) => {
    res.send("Hello!");
  });

app.get("/urls", (req,res) => {
    const templateVars = {urls: urlDatabase};
    res.render("urls_index", templateVars);
});
app.get("/urls/new", (req, res) => {
    
    res.render("urls_new");
});




/*app.post("/urls", (req, res) => {
    console.log(req.body); // Log the POST request body to the console
    res.send("Ok"); // Respond with 'Ok' (we will replace this)
});
*/

app.get("/urls/:id", (req, res) => {
    const templateVars = { id: req.params.id, longURL: urlDatabase };
    res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/delete", (req,res) => {
    const shortURL = req.params.shortURL;
    if (req.session.username === urlDatabase[shortURL].userID) {
      delete urlDatabase[req.params.shortURL];
      res.redirect("/urls");
    } else {
      let templateVars = {
        status: 401,
        message: 'You do not have permission to delete this URL.',
        user: users[req.session.user_id]
      }
      res.status(401);
      res.render("urls_error", templateVars);
    }
  });
  

/*app.post("/urls/:shortURL/delete", (req,res) => {
    if(req.session.username === urlDatabase[shortURL].userID) {
        delete urlDatabase[req.params.shortURL];
        res.redirect("/urls");
    }
    else {
        let templateVars = {
            status: 401,
            message: "You do not have permission to delete this URL",
            user: users[req.session.user_id]
        }
        res.status(401);
        res.render("urls_error", templateVars);
    }
//});

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      res.status(400);
      res.send("Invalid email or password. Please re-enter your information.");
      return;
    }
});

app.post('/login', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/urls');
  });
  
app.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/urls');
})
*/

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
