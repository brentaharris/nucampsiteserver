const express = require('express');
const partnerRouter = express.Router();

//base routing
partnerRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the partners to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
    res.end('Deleting all partners');
});

// partnerId routing
partnerRouter.route('/:partnerId')
.all((req, res) => {
    res.statusCode = 200;
    req.setHeader('Content/Type', 'text/plain')
    res.end(`Will send the details of the partner ${req.params.partnerId}`)
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /partner/${req.params.partnerId}`)
})
.put((req, res) => {
    res.end(`Will update the partner: ${req.body.name} with description ${req.body.description}`)
})
.delete((req, res) => {
    res.end(`Deleting partner of id: ${res.params.partnerId}`)
})







module.exports = partnerRouter;