import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button, Badge } from "flowbite-react"
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from "@/lib/helper/supabaseClient"


interface orderData {
    created_at: string;
    key: number;
    payment: boolean;
    product_id: number;
    product_name: string;
    session: string;
    order_cancel: boolean;

}
const OrderCard = (props: orderData) => {
    // console.log(props)
    const dateObject = new Date(props.created_at);

    const dateOnlyString = dateObject.toISOString().split('T')[0];

    console.log(dateOnlyString);


    const handleClick = async () => {
        if (props.payment) {
            const error = await supabase
                .from("order_list")
                .update({ order_cancel: true })
                .eq("session", props.session);
            console.log(error)
        } else {

            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

            await stripe?.redirectToCheckout({
                sessionId: props.session,
            });
        }
    }

    if (props.order_cancel) {
        return (
            <div >
                <Card className="w-[350px] m-5 bg-red-50">
                    <CardHeader>
                        <CardTitle ><h1 className='text-lg'> {props.product_name} <span> (canceled)</span></h1></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between ">
                            <div>
                                <span>Date :</span> <span>{dateOnlyString}</span>
                            </div>
                            {(props.payment ?
                                <Badge color="success" size="md">Paid</Badge> : <Badge color="failure" size="md">unpaid</Badge>
                            )}
                        </div>

                        <div className=" mt-5">
                            {(props.payment ?
                                <Button disabled onClick={handleClick} color="red" size="sm" className="w-full">Cancel Order</Button> : <Button onClick={handleClick} color="green" size="sm" className="w-full">Pay Now</Button>
                            )}

                        </div>
                    </CardContent>

                </Card>
            </div>
        )
    }
    return (
        <div>
            <Card className="w-[350px] m-5">
                <CardHeader>
                    <CardTitle ><h1 className='text-xl'> {props.product_name}</h1></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center ">
                        <div>
                            <span>Date :</span> <span>{dateOnlyString}</span>
                        </div>
                        {(props.payment ?
                            <Badge color="success" size="md">Paid</Badge> : <Badge color="failure" size="md">unpaid</Badge>
                        )}
                    </div>

                    <div className=" mt-5">
                        {(props.payment ?
                            <Button onClick={handleClick} color="red" size="sm" className="w-full">Cancel Order</Button> : <Button onClick={handleClick} color="green" size="sm" className="w-full">Pay Now</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderCard
