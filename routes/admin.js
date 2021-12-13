var express = require("express");
const { route } = require(".");
var users = require("./../inc/users");
var admin = require("./../inc/admin");
var router = express.Router();

router.use(function(req, res, next){

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {

        res.redirect("/admin/login");

    }else {

        next();

    }

});

router.use(function(req, res, next){

    req.menus = admin.getMenus();

    next();

});

router.get("/logout", function(req, res, next){

    delete req.session.user;

    res.redirect("/admin/login");

});

router.get("/", function(req, res, next){

        res.render("admin/index", {

            menus: req

        });

});

router.get("/login", function(req, res, next){

    users.render(req, res, null);

});

router.post("/login", function(req, res, next){

    if (!req.body.email) {
        users.render(req, res, "Prencha o campo e-mail.");
    }else if (!req.body.password) {
        users.render(req, res, "Prencha o campo senha.");
    }else {

        users.login(req.body.email, req.body.password).then(user =>{

            req.session.user = user;

            res.redirect("/admin");

        }).catch(err =>{

            users.render(req, res, err.message || err);

        });

    }

});

router.get("/contacts", function(req, res, next){

    res.render("admin/contacts", {

        menus: req

    });

});

router.get("/emails", function(req, res, next){

    res.render("admin/emails", {

        menus: req

    });

});

router.get("/menus", function(req, res, next){

    res.render("admin/menus", {

        menus: req

    });

});

router.get("/reservations", function(req, res, next){

    res.render("admin/reservations", {

        menus: req,
        date:{}

    });

});

router.get("/users", function(req, res, next){

    res.render("admin/users", {

        menus: req

    });

});




module.exports = router;
