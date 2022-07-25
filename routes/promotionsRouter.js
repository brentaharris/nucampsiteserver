const express = require('express');
const promotionsRouter = express.Router();

//base routing
promotionsRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the promotionss to you');
})
.post((req, res) => {
    res.end(`Will add the promotions: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotionss');
})
.delete((req, res) => {
    res.end('Deleting all promotionss');
});

// promotionsId routing
promotionsRouter.route('/:promotionsId')
.all((req, res) => {
    res.statusCode = 200;
    req.setHeader('Content/Type', 'text/plain')
    res.end(`Will send the details of the promotions ${req.params.promotionsId}`)
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionsId}`)
})
.put((req, res) => {
    res.end(`Will update the promotions: ${req.body.name} with description ${req.body.description}`)
})
.delete((req, res) => {
    res.end(`Deleting promotions of id: ${res.params.promotionsId}`)
})







module.exports = promotionsRouter;