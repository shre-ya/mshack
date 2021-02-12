const mongoose = require('mongoose');

const Job = mongoose.model('msjobs');
const { v4: uuidv4 } = require('uuid');

const requireLogin = require('../middlewares/requireLogin');
const requireAuthor = require('../middlewares/requireAuthor');
const requireFields = require('../middlewares/requireFields');

const keys = require('../config/keys');

module.exports = (app) => {
    //Get job by page number
    app.get('/api/page_job', requireLogin, async (req, res) => {
        //see for date
        var d = new Date();
        const curdate = d.toISOString();
        var page_jobs = await Job.find({ isDeleted: false });
        res.send(page_jobs);

    })
    // app.get('/api/page_job', requireLogin, async (req, res) => {
    //     const page = parseInt(req.query.page);
    //     const PAGE_SIZE = 10;//change this accordingly
    //     const skip = (page - 1) * PAGE_SIZE;
    //     const body_batch = req.query.batch;
    //     const body_companyName = req.query.companies;
    //     const body_role = req.query.role;
    //     const sortBy = req.query.sortBy;

    //     var d = new Date();
    //     const curdate = d.toISOString();

    //     var job = await Job.find({
    //         "$and": [body_batch ? { "batch": { "$in": body_batch } } : {}, { isDeleted: false }, body_companyName ? { "companyName": { "$in": body_companyName } } : {},
    //         body_role ? { "role": { "$in": body_role } } : {}]
    //     });
    //     const jobcount = job.length;
    //     var jobc = '' + jobcount

    //     var page_jobs = await Job.find({
    //         "$and": [body_batch ? { "batch": { "$in": body_batch } } : {}, { isDeleted: false }, body_companyName ? { "companyName": { "$in": body_companyName } } : {},
    //         body_role ? { "role": { "$in": body_role } } : {}]
    //     })
    //         .sort({ [req.query.sortBy]: req.query.comparator })
    //         .skip(skip)
    //         .limit(PAGE_SIZE)
    //         .populate('previewComment');
    //     var arr = {
    //         page: page_jobs,
    //         count: jobc
    //     }
    //     res.send(arr);
    // })
    //Add liker
    app.post('/api/add_liker', requireLogin, async (req, res) => {
        const user = req.user.googleId
        const jobId = req.body.jobId;
        try {
            var job = await Job.findOne({ jobId: jobId });
            var isPresent = job.likers.includes(user);
            if (!isPresent) {
                job.likers.push(user);
                job.likersCount += 1;
            }
            await job.save();
            res.send("true");
        }
        catch (err) {
            res.send(err);
        }
    })
    //remove liker
    app.post('/api/remove_liker', requireLogin, async (req, res) => {
        const user = req.user.googleId;
        const jobId = req.body.jobId;
        var job = await Job.findOne({ jobId: jobId });
        var isPresent = job.likers.includes(user);
        if (isPresent) {
            const index = job.likers.indexOf(user);
            job.likers.splice(index, 1);
            job.likersCount -= 1;
        }
        await job.save();
        res.send("true");
    })
    //  Delete Job
    app.delete('/api/delete_job/:jobId', requireLogin, requireAuthor, async (req, res) => {
        const jobId = req.params['jobId'];
        const job = await Job.findOne({ jobId: jobId }, (err) => {
            if (err)
                throw err;
        });
        job.isDeleted = true;
        job.save();
        res.send(true);
    })

    //  Add Job 
    app.post('/api/add_job', requireLogin, async (req, res) => {
        // console.log("Yes");
        try {
            const newId = uuidv4();
            const newJob = await new Job({
                jobId: newId,
                companyName: req.body.companyName,
                jobTitle: req.body.jobTitle,
                jobExpiry: req.body.jobExpiry,
                postedBy: req.user.name,
                postedById: req.user.id,
                role: req.body.role,
                salary: req.body.salary
            }).save();
            // console.log(newJob);
            res.send(true);
        }
        catch (err) {
            // console.log(err);
            res.send(err);
        }
    });

}