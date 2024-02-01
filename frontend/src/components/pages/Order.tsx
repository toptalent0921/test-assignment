import { useEffect, useState } from "react"
import OrderCard from "../subcomponent/OrderCard"
import { supabase as subbase } from "@/lib/helper/supabaseClient"
import { Hourglass } from "react-loader-spinner"
import { useAuth0 } from '@auth0/auth0-react';
import NoOrderFound from "../subcomponent/NoOrderFound";

interface orderData {
    created_at: string;
    email: string;
    id: number;
    payment: boolean;
    product_id: number;
    product_name: string;
    session: string;
    order_cancel: boolean;

}
const Order = () => {
    const [data, setData] = useState<orderData[]>([{
        created_at: "",
        email: "",
        id: 0,
        payment: false,
        product_id: 0,
        product_name: "",
        session: "",
        order_cancel: false,
    }])
    const { user } = useAuth0();
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const { data } = await subbase
                    .from('order_list')
                    .select('*')
                    .eq('email', user.email);
                if (data) {
                    setData(data)
                }
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (data.length === 1) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#15803d', '#86efac']}
                />

            </div>
        )
    }
    if (data.length === 0) {
        return <NoOrderFound />
    }



    return (
        <div className="flex flex-wrap max-w-4xl  m-auto">
            <div className=" w-80 h-80 diffBorder absolute bg-green-200 top-10 rotate-90  -left-6"></div>
            <div className=" w-96 h-96 diffBorder absolute bg-green-200 top-40 rotate-45  right-24"></div>
            <div className=" w-40 h-40 diffBorder absolute bg-green-200 bottom-10 rotate-12  left-52"></div>
            <div className=' flex flex-col'></div>
            {data.map((data) => {
                return <OrderCard key={data.id} product_id={data.product_id} product_name={data.product_name} session={data.session} payment={data.payment} created_at={data.created_at} order_cancel={data.order_cancel} />
            })}
        </div>
    )

}

export default Order
