import Booking from '../models/Booking.js'
import Stripe from 'stripe';
import Property from '../models/Property.js';
import Razorpay from 'razorpay'
import { instance } from '../index.js'
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';
import crypto from 'crypto'
import Payment from '../models/Payment.js';


//CREATE

export const intent = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_KEY)
  const property = await Property.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: property.PropertyAmount * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const newBooking = new Booking({
    sellerId: property.userId,
    buyerId: req.user.id,
    PropertyName: property.PropertyName,
    PropertyAmount: property.PropertyAmount,
    PropertyState: property.PropertyState,
    PropertyDistrict: property.PropertyDistrict,
    PropertyCity: property.PropertyCity,
    PropertyAddress: property.PropertyAddress,
    Timespan: property.Timespan,
    Bedrooms: property.Bedrooms,
    Bathrooms: property.Bathrooms,
    OwnerName: property.OwnerName,
    OwnerPhone: property.OwnerPhone,
    OwnerEmail: property.OwnerEmail,
    Image1: property.Image1,
    Image2: property.Image2,
    Image3: property.Image3,
    payment_intent: paymentIntent.id
  });

  await newBooking.save()

  res.status(200).send({
    clientSecret: paymentIntent.client_secret
  })

}

export const RazorpayInt = async (req, res) => {
  const property = await Property.findById(req.params.id);
  console.log(req.body)
  var options = {
    amount: property.PropertyAmount * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  const order = await instance.orders.create(options)
  console.log(order)
  

  res.status(200).json(order)
  const newBooking = new Booking({
    sellerId: property.userId,
    buyerId: req.user.id,
    PropertyName: property.PropertyName,
    PropertyAmount: property.PropertyAmount,
    PropertyState: property.PropertyState,
    PropertyDistrict: property.PropertyDistrict,
    PropertyCity: property.PropertyCity,
    PropertyAddress: property.PropertyAddress,
    Timespan: property.Timespan,
    Bedrooms: property.Bedrooms,
    Bathrooms: property.Bathrooms,
    OwnerName: property.OwnerName,
    OwnerPhone: property.OwnerPhone,
    OwnerEmail: property.OwnerEmail,
    isCompleted: true,
    Image1: property.Image1,
    Image2: property.Image2,
    Image3: property.Image3,
    payment_intent: order.id
  });

  await newBooking.save()

}

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;
    const hmac = crypto.createHmac('sha256', process.env.KEY_SECRET);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id, process.env.KEY_SECRET);
    const generated_signature = hmac.digest('hex');

    validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, process.env.KEY_SECRET);
    if (generated_signature == razorpay_signature) {
      // Database 
      const payment = await Payment({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
      await payment.save()
      
    } else {
      res.status(400).json({
        success: false,
      });

    }


  } catch (error) {
    console.log(error)
  }

}

//UPDATE
export const confirm = async (req, res, next) => {
  try {
    const orders = await Booking.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

//DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json("Order has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET USER ORDERS
export const GetUserBooking = async (req, res) => {
  try {
    const booking = await Booking.find({ userId: req.params.userId });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
}