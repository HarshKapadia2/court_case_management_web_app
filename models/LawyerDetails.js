const mongoose = require('mongoose');

const LawyerDetailsSchema = new mongoose.Schema
(
    {
        lawyer_id: {
            type: Object(),
            required: true
        },
        bar_council_id: {
            type: String,
            required: true
        },


        company_name: {
            type: String,
            required: true
        },


        pref_case_types: {
            type: Object(),
            required: true
        },
        exp_yrs: {
            type: Number,
            required: true
        },
        experience: {
            type: String,
            required: true
        },


        dob: {
            type: Date
        },
        age: {
            type: Number
        },


        fees: {
            type: Number,
            required: true
        },
        fee_descp: {
            type: String,
            required: true
        },

        
        ph_no: {
            type: Number,
            required: true
        }
    }
);


const LawyerDetails = mongoose.model('LawyerDetails', LawyerDetailsSchema);

module.exports = LawyerDetails;