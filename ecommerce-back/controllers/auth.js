const User = require('../models/user');
const jwt = require('jsonwebtoken'); // pour générer un jeton signé
const expressJwt = require('express-jwt'); // pour le contrôle d'autorisation
const {errorHandler} = require("../helpers/dbErrorHandler");


exports.signup = (req, res) => {
    //console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    })
};

exports.signin = (req, res) => {
    // trouver l'utilisateur en fonction de l'e-mail
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Adresse email inexistante. Inscrivez-vous !"
            });
        }
        // si l'utilisateur est trouvé, on s'assure que l'e-mail et le mot de passe correspondent
        // créer une méthode d'authentification dans le modèle utilisateur
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Mot de passe incorrecte"
            });
        }
        // générer un jeton signé avec un identifiant et un secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        // conserver le jeton en tant que 't' dans le cookie avec la date d'expiration
        res.cookie('t', token, {expire: new Date() + 9999});
        // renvoyer la réponse avec l'utilisateur et le jeton au client
        const {_id, name, email, address, phone, role} = user;
        return res.json({token, user: {_id, email, name, address, phone, role}});
    });

};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({message: "Déconnexion réussie"});
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    //console.log("req.profile", req.profile);
    //console.log("req.auth", req.auth);
    //console.log("req.profile._id", req.profile._id);
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
        if(!user) {
            return res.status(403).json({
             error: 'Accès non autorisé'
            });
        }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role===0) {
        return res.status(403).json({
            error: 'Ressource administrative. Accès non autorisé'
        });
    }
    next();
};