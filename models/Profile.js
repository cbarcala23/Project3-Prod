const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //reference user model
        ref: 'user'
    },
    languages: {
        type: [String]
    },
    location: {
        type: String
    },
    hometown: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    hobbies: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    // githubusername: {
    //     type: String
    // },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            languages: {
                type: [String],
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                required: true
            },
            description: {
                type: String,
            },
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                required: true
            },
            description: {
                type: String,
            },
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instragram: {
            type: String
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);