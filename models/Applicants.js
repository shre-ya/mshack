const mongoose = require('mongoose');
const { Schema } = mongoose;

const ApplicantsSchema = new Schema({
    aname: String,
    acontact: String,
    aemail: String,
    jobId: String,

});

mongoose.model('applicants', ApplicantsSchema);
