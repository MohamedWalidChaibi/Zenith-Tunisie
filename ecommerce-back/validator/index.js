exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Le nom est obligatoire').notEmpty()
    req.check('email', 'Adresse email doit être entre 3 et 32 caractères')
        .matches(/.+\@.+\..+/)
        .withMessage('Adresse email doit contenir @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Le mot de passe est obligatoire').notEmpty();
    req.check('password')
        .isLength({min: 6})
        .withMessage("Le mot de passe doit comporter au moins 6 caractères")
        .matches(/\d/)
        .withMessage("Le mot de passe doit contenir un nombre");
    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
};