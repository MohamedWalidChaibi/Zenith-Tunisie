const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
    Product.findById(id).populate("category").exec((err, product) => {
        if(err || !product) {
            return res.status(400).json({
                error: "Produit introuvable"
            });
        }
        req.product = product;
        next();
    });
};

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image ne peut pas être charger'
            });
        }
        // vérifier tous les champs
        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'Tout les champs doivent être remplis!'
            });
        }


        let product = new Product(fields);

        if(files.photo) {
            //console.log('FILES PHOTO: ', files.photo); 
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Taille image trop grande! Image doit être inférieur à 1 mb.'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
            console.log('product.photo.data: ', product.photo.data);
            console.log('product.photo.contentType: ', product.photo.contentType); 
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            // Produit supprimé
            "message": 'Produit supprimé'
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepEtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Image ne peut pas être charge'
            });
        }
        // vérifier tous les champs
        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'Tout les champs doivent être remplis!'
            });
        }

        let product = req.product;
        product = _.extend(product, fields)

        if(files.photo) {
            //console.log('FILES PHOTO: ', files.photo); 
            if(files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Taille image trop grande! Image doit être inférieur à 1 mb.'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * vendu / arrivé
 * by sell = /products?sortBy=sold&order=desc&limit=6
 * by arrival = /products?sortBy=createat&order=desc&limit=6
 * si aucun paramètre n'est envoyé, alors tous les produits sont retournés
 */

exports.list =(req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    
    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if(err) {
                return res.status(400).json({
                    error: "Produits introuvables!"
                });
            }
            res.send(products)
        });
};

/**
 * Il trouvera les produits en fonction de la catégorie de produit demandée
 * D'autres produits qui ont la même catégorie, seront retournés
 */

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 3;

    Product.find({_id: {$ne: req.product}, category: req.product.category})
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: "Produits introuvables!"
            });
        }
        res.json(products);
    })
}

exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if(err) {
            return res.status(400).json({
                error: "Catégories introuvables!"
            });
        }
        res.json(categories);
    })
 }



/**
 * lister les produits par recherche
 * Mettre en œuvre la recherche des produits en frontend
 * Affichage des catégories dans la case à cocher et la fourchette des prix dans les boutons radio
 * lorsque l'utilisateur clique sur ces cases à cocher et ces boutons radio
 * Envoyer une requete à l'API et afficher les produits aux utilisateurs en fonction de ce qu'ils ont selectionner
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Produits introuvables"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};



exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.listSearch = (req, res) => {
    // créer un objet requête pour contenir la valeur de recherche et la valeur de catégorie
    const query = {}
    // affecter la valeur de recherche à query.name
    if(req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" }
        // affecter une valeur de catégorie à query.category
        if(req.query.category && req.query.category != "All") {
            query.category = req.query.category
        }
        // trouver le produit basé sur l'objet de requête avec 2 propriétés
        // recherche et catégorie
        Product.find(query, (err, products) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        }).select("-photo")

    }
}


exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map((item) => {
        return {
            updateOne: {
                filter: {_id: item._id},
                update: {$inc: {quantity: -item.count, sold: -item.count}}
            }
        };
    });
    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if(error) {
            return res.status(400).json({
                error: "Impossible de mettre à jour le produit"
            })
        }
        next();
    })
}