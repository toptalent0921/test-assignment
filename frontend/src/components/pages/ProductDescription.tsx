import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/helper/supabaseClient';
import { useSearchParams } from 'react-router-dom';
import { Carousel } from 'flowbite-react';
import BookForm from '../subcomponent/BookForm';
import { Hourglass } from "react-loader-spinner"


interface Service {
    id: number;
    created_at: string;
    title: string;
    Availability: string;
    description: string;
    shortDescription: string;
    price: number;
}

const ProductDescription: React.FC = () => {
    const [service, setService] = useState<Service[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [searchParams] = useSearchParams();
    const serviceId = searchParams.get('id');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .eq('id', serviceId);

                if (error) {
                    setErrorMessage('Could not find data');
                    console.error(errorMessage || 'Unknown error');
                }

                if (data && data.length > 0) {
                    setErrorMessage('');
                    setService(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [serviceId]);

    if (service.length === 0) {
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
        );
    }

    return (
        <div>

            <div className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <Carousel>
                                    <img src="https://source.unsplash.com/500x500/?horse,pet" alt="..." />
                                    <img src="https://source.unsplash.com/500x500/?horse,jungle" alt="..." />
                                    <img src="https://source.unsplash.com/500x500/?horse,love" alt="..." />
                                    <img src="https://source.unsplash.com/500x500/?horse" alt="..." />
                                    <img src="https://source.unsplash.com/500x500/?horse,nature" alt="..." />
                                </Carousel>

                            </div>

                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{service[0].title}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                {service[0].shortDescription}
                            </p>
                            <div className="flex mb-4">
                                <div className="mr-4 bg-green-100 rounded-full px-3 py-1 ">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                    <span className="text-gray-600 dark:text-gray-300">${service[0].price}/-</span>
                                </div>
                                <div className=' bg-amber-100 rounded-full px-3 py-1'>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Availability: </span>
                                    <span className="text-gray-600 dark:text-gray-300">{service[0].Availability} </span>
                                </div>
                            </div>
                            <div className="flex -mx-2 mb-4">
                                <div className="w-full px-2">
                                    <BookForm productId={service[0].id} price={service[0].price} productName={service[0].title} />
                                </div>

                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Service Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                    {service[0].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription
