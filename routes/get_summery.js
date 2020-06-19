'use strict';

const _ = require('lodash');
const axios = require('axios');
const url = 'https://randomuser.me/api/?results=1000&dataType=json'

const summary_generator = (data) => {
    return _.reduce(data, (summary, user) => {
        if (summary[user.location.country]) {
            if (user.dob.age > 0 && user.dob.age <= 30) {
                summary[user.location.country]['0_30'] += 1;
            } else if (user.dob.age > 30 && user.dob.age <= 50) {
                summary[user.location.country]['30_50'] += 1;
            } else {
                summary[user.location.country]['50_above'] += 1;
            }
        } else {
            summary[user.location.country] = {'0_30': 0, '30_50': 0, '50_above': 0};
        }
        return summary;
    }, {})
}

const router = (req, res) => {
    axios.get(url)
        .then(response => response.data.results)
        .then(data => {
            let male = _.filter(data, user => user.gender === 'male');
            let female = _.filter(data, user => user.gender === 'female');
            let male_summary = summary_generator(male);
            let female_summary = summary_generator(female);

            // rendering this api with ejs template engine.
            // comment res.rendor if you want json data only and uncomment res.json 
            res.render('summary', {male_summary: male_summary, female_summary: female_summary})
            // res.json({male_summary, female_summary});
        })
        .catch(err => {
            console.log('err---->', err);
            res.send('failed to make http request');
        })
}

module.exports = router;
