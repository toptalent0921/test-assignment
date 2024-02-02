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

app.use(cors());

// Stripe webhook endpoint
app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (request, response) => {
        console.log("====================================");
        console.log("webhook is running");
        console.log("====================================");
        const sig = request.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                sig,
                "whsec_ZOE2bYCCH7L6gd503jmIHNXX23ErVGKO"
            );
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        // console.log("====================================");
        // console.log("webhook is running", event);
        // console.log("====================================");
        // console.log(
        //     "custom detail",
        //     event.data.object.payment_intent,
        //     event.data.object.id
        // );

        switch (event.type) {
            case "checkout.session.async_payment_failed":
                const checkoutSessionAsyncPaymentFailed = event.data.object;
                // Then define and call a function to handle the event checkout.session.async_payment_failed
                break;
            case "checkout.session.async_payment_succeeded":
                const checkoutSessionAsyncPaymentSucceeded = event.data.object;
                // Then define and call a function to handle the event checkout.session.async_payment_succeeded
                break;
            case "checkout.session.completed":
                const checkoutSessionCompleted = event.data.object;
                // Then define and call a function to handle the event checkout.session.completed
                const paymentUpdate = async () => {
                    await supabase
                        .from("order_list")
                        .update({ payment: true })
                        .eq("session", event.data.object.id);
                };

                if (event.data.object.payment_status === "paid") {
                    paymentUpdate();
                }

                break;
            case "checkout.session.expired":
                const checkoutSessionExpired = event.data.object;
                // Then define and call a function to handle the event checkout.session.expired
                break;
            case "climate.order.created":
                const climateOrderCreated = event.data.object;
                // Then define and call a function to handle the event climate.order.created
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }
);

app.use(express.json());

app.get("/test", async (req, res) => {
    const paymentIntent = await stripeClient.paymentIntents.retrieve(
        "pi_3OaYzVSHA6kZM5pL1DQbAHnF"
    );

    console.log("-----------------------------------------");
    console.log(paymentIntent);
    console.log("-----------------------------------------");
    res.json(paymentIntent);
});

app.post("/api/create-checkout-session", async (req, res) => {
    const { information } = req.body;

    const { createError } = await supabase.from("users").insert({
        name: information.name,
        email: information.email,
        phone: information.phone,
        address: information.address,
    });
    console.log(createError);
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
        phone_number_collection: {
            enabled: true,
        },
        customer_email: information.email,
        success_url: "https://test-assignment-i5mu.vercel.app/order",
        cancel_url: "https://test-assignment-i5mu.vercel.app/",
        // success_url: "http://localhost:5173",
        // cancel_url: "http://localhost:5173",
    });

    // const createData = async () => {
    const { error } = await supabase.from("order_list").insert({
        email: information.email,
        product_id: information.productId,
        session: session.id,
        product_name: information.productName,
    });
    let { data } = await supabase.from("Order-list").select("*");
    console.log(error);
    console.log(data);
    // };

    // createData();
    res.json({ id: session.id });
});

app.listen(7000, () => {
    console.log("server start");
});
