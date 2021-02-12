const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

    app.get('/api/applicants', requireLogin, async (req, res) => {
        var applicants_list = '{ "applicants" : [' +
            '{ "firstName":"Joey" , "mobileNumber":"9263541280" },' +
            '{ "firstName":"Rachel Greene" , "mobileNumber":"9173547299" },' +
            '{ "firstName":"Kishan Kumar" , "mobileNumber":"6315469772" } ]}';

        const applicants = JSON.parse(applicants_list);
        res.send(applicants);

    })
}