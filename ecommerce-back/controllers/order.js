const {Order, CartItem} = require("../models/order")
const { errorHandler } = require("../helpers/dbErrorHandler");
const nodemailer = require("nodemailer")


exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.create = (req, res) => {
    console.log("Commande créée: ", req.body);
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }

        const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: 'zenith.tn@outlook.com',
              pass: '123456789',
            },
          });
        
          const emailAdmin = {
            from: '"Zenith Tunisie" <zenith.tn@outlook.com>', // adresse de l'expéditeur
            to: "zenith.admin@gmail.com", // admin
            subject: "Une nouvelle commande est reçue", // Ligne de l'objet
            html: `
            <h1>Bonjour Admin,</h1>
            <h2>Nom du client: ${order.user.name}</h2>
            <h2>Adresse du client: ${order.address}</h2>
            <h2>Historique des achats: ${order.user.history.length} achats</h2>
            <h2>Courriel de l'utilisateur: ${order.user.email}</h2>
            <h2>Total des produits: ${order.products.length}</h2>
            <h2>Transaction: ${order.transaction_id}</h2>
            <h2>Statut de la commande: ${order.status}</h2>
            <h2>Details produit:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return ` <div>
                        <h3>Nom de produit: ${p.name}</h3>
                        <h3>Prix: ${p.price}</h3>
                        <h3>Quantité: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Montant total de la commande: ${order.amount} TND<h2>
            <p>Connecter vous à votre dashboard</a> pour voir les détails de la commande</p>
            `, // html body
          }
          // envoyer un courrier avec un objet de transport défini
        transporter.sendMail(emailAdmin, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
    
            console.log('Message sent: %s', info.messageId);
 
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
       
                // email to buyer
                const emailUser = {
                    to: order.user.email,
                    from: '"Zenith Tunisie" <zenith.tn@outlook.com>',
                    subject: "Votre commande est en coursé",
                    html: `
                    <h1>Bonjour ${req.profile.name},</h1>
                    <h2>Total des produits: ${order.products.length}</h2>
                    <h2>Transaction: ${order.transaction_id}</h2>
                    <h2>Statut de la commande: ${order.status}</h2>
                    <h2>Details produit:</h2>
                    <hr />
                    ${order.products
                        .map(p => {
                            return `<div>
                                <h3>Product Name: ${p.name}</h3>
                                <h3>Product Price: ${p.price}</h3>
                                <h3>Product Quantity: ${p.count}</h3>
                        </div>`;
                        })
                        .join('--------------------')}
                    <h2>Montant total de la commande: ${order.amount} TND<h2>
                    <p>Merci de faire vos achats avec nous.</p>
                `
                };
                transporter.sendMail(emailUser, (err, info) => {
                    if (err) {
                        console.log('Error occurred. ' + err.message);
                        return process.exit(1);
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
        

        res.json(data)
    })
};

exports.listOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((err, orders) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(orders);
    })
}


exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
};


exports.updateOrderStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(order);
        }
    );
};
