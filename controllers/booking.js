import Booking from '../models/Booking.js'
import Stripe from 'stripe';
import Property from '../models/Property.js';
//CREATE




export const intent = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_KEY)
    const property = await Property.findById(req.params.id);
    console.log("+++++++++++++++++++++++++")
    console.log(req.user.id)
    console.log("+++++++++++++++++++++++++")

    const paymentIntent = await stripe.paymentIntents.create({
    amount: property.PropertyAmount *100,
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
export const CreateBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res.status(500).json(err);
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