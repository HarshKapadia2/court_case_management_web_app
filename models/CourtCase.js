const mongoose = require('mongoose');

const CourtCaseSchema = new mongoose.Schema
(
    {
        client_id: {
            type: String,
            required: true
        },
        lawyer_id: {
            type: String
        },
        court_case_no: {
            type: String
        },


        case_type: {
            type: String
        },
        case_name: {
            type: String,
            required: true
        },
        case_descp: {
            type: String,
            required: true
        },


        court_type: {
            type: String
        },
        h_date: {
            true: Date
        },


        isResolved: {
            type: String,
            default: "N"
        }
    }
);


const CourtCase = mongoose.model('CourtCase', CourtCaseSchema);

module.exports = CourtCase;