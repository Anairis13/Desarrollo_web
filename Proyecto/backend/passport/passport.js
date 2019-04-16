
const passport= require("passport");
const localStrategy= require("passport-local").Strategy;
const User= require("../models/usuario");


module.exports = function(passport){
passport.use({passReqToCallback : true},
  new localStrategy(function(username, password, done) {
      // console.log('HAKSKAJS');
      User.findOne({ correo: username }, function(err, user) {
          if (err) {
              return done(err);
          }
          if (!user) {
              return done(null, false);
          }
          if (User.password != password) {
              return done(null, false);
          }
          return done(null, user);
      });
  })
);

// aqui cuando el usuario se autentique se va a crear una sesion para guardar los datos del usuario
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

// este hace el proceso inverso y lo que toma es el ID de la sesion
passport.deserializeUser((id,done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
})
}