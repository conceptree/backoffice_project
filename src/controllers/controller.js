exports.renderHomePage = (req, res)=>{
    res.render("index", {locals: {title: 'OctoMovies | Backoffice'}});
};

exports.renderLoginPage = (req, res)=>{
    res.render("login", {
        title:"OctoMovies | Login",
        loginTitle:"Client Area"
    });
};