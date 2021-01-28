const jwtSecret = require("./jwtConfig");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const tables = require("../src/sequelize");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = tables[0];

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        User
          .findOne({
            where: {
              username: username,
            },
          })
          .then((user) => {
            if (user != null) {
              console.log("Nome de utilizador já existe!");
              return done(null, false, {
                message: "Nome de utilizador já existe!",
              });
            } else {
              bcrypt
                .hash(password, BCRYPT_SALT_ROUNDS)
                .then((hashedPassword) => {
                  User
                    .create({
                      first_name: "xpto",
                      last_name: "xpto",
                      email: "xpto",
                      username,
                      password: hashedPassword,
                    })
                    .then((user) => {
                      console.log("Utilizador adicionado!");
                      return done(null, user);
                    });
                });
            }
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
            where: {
              username: username,
            },
          })
          .then((user) => {
            if (user == null) {
              return done(null, false, {
                message: "Invalid user name!",
              });
            } else {
              bcrypt.compare(password, user.password).then((response) => {
                if (response != true) {
                  console.log("Password dont match!");
                  return done(null, false, {
                    message: "Password dont match!",
                  });
                }
                console.log("User Found and authenticated!");
                return done(null, user);
              });
            }
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("JWT"),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User
        .findOne({
          where: {
            username: jwt_payload.id,
          },
        })
        .then((user) => {
          if (user) {
            console.log("Utilizador encontrado na BD em passport!");
            done(null, user);
          } else {
            console.log("Utilizador não encontrado na BD!");
            done(null, false);
          }
        });
    } catch (err) {
      done(err);
    }
  })
);
