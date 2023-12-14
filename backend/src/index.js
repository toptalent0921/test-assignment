import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_KEY
);
// Set your Stripe API key
const stripeSecretKey = process.env.STRIPE_SK;
const stripeClient = stripe(stripeSecretKey);

app.use(express.json());
app.use(cors());

// Stripe webhook endpoint
// app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
//     const sig = req.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(
//             req.body,
//             sig,
//             stripeWebhookSecret
//         );
//     } catch (err) {
//         console.error("Webhook Error:", err.message);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the payment_intent.succeeded event
//     if (event.type === "payment_intent.succeeded") {
//         const paymentIntent = event.data.object;
//         console.log("PaymentIntent succeeded:", paymentIntent);

//         // Extract relevant data from paymentIntent and store in Supabase
//         const { amount_received, customer, metadata } = paymentIntent;

//         const createData = async () => {
//             const { error } = await supabase.from("payments").insert({
//                 amount_received,
//                 customer,
//                 metadata,
//                 // Add other fields as needed
//             });

//             if (error) {
//                 console.error("Error storing data in Supabase:", error.message);
//             } else {
//                 console.log("Data stored in Supabase successfully");
//             }
//         };
//         createData();
//     }

//     // Acknowledge receipt of the event
//     res.json({ received: true });
// });

// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
    const { information } = req.body;

    // console.log(information);

    const createData = async () => {
        const { error } = await supabase.from("users").insert({
            name: information.name,
            email: information.email,
            phone: information.phone,
            address: information.address,
        });

        // let { data } = await supabase
        //     .from("users") // Assuming your service data structure follows the 'Service' interface
        //     .select("*");

        // console.log("====================================");
        // console.log(error);
        // console.log("====================================");
    };
    createData();

    const lineItems = [
        {
            price_data: {
                currency: "usd",
                product_data: {
                    name: `${information.productName} (id: ${information.productId})`,
                },
                unit_amount: information.price * 100,
            },
            quantity: 1,
        },
    ];

    const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/",
        cancel_url: "http://localhost:5173/",
    });

    if (false) {
        const { error } = await supabase
            .from("countries")
            .update({ name: "Australia" })
            .eq("email", information.email)
            .eq("phone", information.phone)
            .eq("address", information.address);

        console.log(error, "working");
    }

    // console.log("====================================");
    // console.log(session);
    // console.log("====================================");
    res.json({ id: session.id });
});

app.listen(7000, () => {
    console.log("server start");
});
