const express = require("express");
const router = express.Router();

const {requireSignin, isAuth, isAdmin} = require("../controllers/auth");

const {userById, read, update, purchaseHistory, listUsers, remove} = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);
router.get("/users", listUsers);
router.get('/admin/user/:userId', read);
router.put('/admin/user/:userId', update);
router.delete('/admin/user/:userId', remove);

router.param("userId", userById);

module.exports = router;