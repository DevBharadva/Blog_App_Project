const mongoose = require('mongoose');

const otpSchema  = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60, // OTP expires after 60 seconds (1 minute)
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("OTP", otpSchema);
