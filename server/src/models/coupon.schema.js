import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    couponName: {
        type: String,
        required: true
    },
    couponType: {
        type: String,
        enum: ['%', 'Rs'],
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

// module.exports = mongoose.model('Coupon', couponSchema);
const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;