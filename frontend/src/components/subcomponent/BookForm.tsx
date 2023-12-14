import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import { useAuth0 } from '@auth0/auth0-react';
import Login from "./LoginButton"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import GooglePayButton from '@google-pay/button-react';
import { loadStripe } from '@stripe/stripe-js';



const formSchema = z.object({
    name: z.string().min(2).max(50),
    phone: z.number().min(7).max(11),
    address: z.string(),
})


type parameter = {
    productId: number;
    price: number;
    productName: string;
}

const BookForm = (param: parameter) => {
    const { user } = useAuth0();
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (value: z.infer<typeof formSchema>) => {

        const information = { ...value, email: user?.email, ...param }

        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

        const body = {
            information: information
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch("https://test-assignment-one.vercel.app/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe?.redirectToCheckout({
            sessionId: session.id
        });

        if (result) {
            console.log(result);
        }

    }

    if (!user) {
        return (
            <>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size={"full"}>Book Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Book Now</DialogTitle>
                            <DialogDescription>
                                book our premium and exclusive service now.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Login />

                        </div>
                    </DialogContent>
                </Dialog>
            </>
        )
    } else {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button size={"full"}>Book Now</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">

                    <Form {...form}>
                        <FormField
                            // control={...}
                            name="..."
                            render={() => (
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" required  {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Phone Number" required type='number' {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public display name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="address" required type='text' {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    follow this formate House No , Street/Landmark , Zipcode, State, Country.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <Button type="submit">Pay Now</Button>
                                </form>
                            )}
                        />
                    </Form>



                </DialogContent>
            </Dialog>
        )
    }
}

export default BookForm
