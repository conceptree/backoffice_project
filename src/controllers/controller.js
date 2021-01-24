const components = require("./components");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqladmin',
    database: 'octodb'
  });

db.connect((err) => {
    if (err) throw err;
        console.log('Connected!');
});

exports.renderHomePage = (req, res) => {
    const query = "SELECT * FROM movies";
    db.query(query, (error, result)=>{
        res.render("index", {
            locals: {
                title: 'OctoMovies | Backoffice',
                navigation:components.navigation(),
                footer:components.footer(),
                movies:result
            }
        });
    });
};

exports.renderLoginPage = (req, res) => {
    res.render("loginPage", {
        locals: {
            title: 'OctoMovies | Login',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.renderRegisterPage = (req, res) => {
    res.render("registrationPage", {
        locals: {
            title: 'OctoMovies | Register',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.renderMoviesPage = (req, res) => {
    res.render("movies", {
        locals: {
            title: 'OctoMovies | Movies',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.renderPrivacyPage = (req, res) => {
    res.render("privacy", {
        locals: {
            title: 'OctoMovies | Privacy',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.renderAccountPage = (req, res) => {
    res.render("account", {
        locals: {
            title: 'OctoMovies | Account',
            navigation:components.navigation(),
            footer:components.footer()
        }
    });
};

exports.register = async (req, res) => {
    console.log(req);
    try{
        const user = {
            name:req.body.name,
            email:req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        };
        const sql =  "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, user.name, user.email, user.password);
    }catch{
        console.log("error");
    }
};