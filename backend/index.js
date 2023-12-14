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

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (request, response) => {
        const sig = request.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                sig,
                "whsec_BW0Hwyuwi4izy6YgUXqF1vIFpgzlgUlX"
            );
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntentSucceeded = event.data.object;
                // Then define and call a function to handle the event payment_intent.succeeded
                // const { error } = supabase
                //     .from("countries")
                //     .update({ name: "Australia" })
                //     .eq("id", 1);

                // console.log(error, "working");

                console.log("====================================");
                console.log("working");
                console.log("====================================");
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    }
);

app.get("/test", async (req, res) => {
    res.json({
        greet: "hello",
    });
});
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
        success_url: "https://test-assignment-i5mu.vercel.app/",
        cancel_url: "https://test-assignment-i5mu.vercel.app/",
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
