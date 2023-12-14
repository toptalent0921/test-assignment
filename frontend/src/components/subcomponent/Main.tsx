import { Button } from 'flowbite-react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Main = () => {
    return (
        <>
            <div className=' bg-green-200 py-24 relative'>
                <div className=" w-80 h-80 diffBorder absolute bg-green-200 -top-40 rotate-90  -left-6"></div>

                <div className=' flex items-center justify-center md:flex-row flex-col-reverse m-10'>
                    <div className='p-5 '>
                        <h1 className="max-w-2xl mb-6 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-green-900 ">About Us</h1>
                        <p className="max-w-2xl mb-6 font-light text-green-700 lg:mb-8 md:text-lg lg:text-xl ">At Horse Care, we understand the special bond between you and your horse. With a passion for equine well-being, we have curated a comprehensive range of services dedicated to ensuring the health, happiness, and vitality of your beloved companions..</p>
                        <Button> hello</Button></div>
                    <div className=''>
                        <img src="https://images.squarespace-cdn.com/content/v1/6059408180248961351f697c/1616546912894-LHHZTX4DRYVI934197YB/HorseWash.png" alt="mockup" />
                    </div>
                </div>
            </div>

            <div className=' relative'>
                <div className=" w-80 h-80 diffBorder absolute bg-green-200 top-10 rotate-90  -left-6"></div>
                <div className=" w-96 h-96 diffBorder absolute bg-green-200 top-40 rotate-45  right-24"></div>
                <div className=" w-40 h-40 diffBorder absolute bg-green-200 bottom-10 rotate-12  left-52"></div>
                <div className=' flex flex-col'>
                    <h1 className="  mb-6 mt-12 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-green-900  m-auto">Our Service</h1>
                </div>
                <div className='  h-1 bg-black rounded-full max-w-7xl m-auto mb-10'></div>

                <div className=' flex justify-center  flex-wrap '>
                    <Card className="w-[350px] m-5">
                        <CardHeader>
                            <CardTitle ><h1 className=''>Veterinary Care</h1></CardTitle>
                        </CardHeader>
                        <CardContent>
                            Our team of experienced veterinarians is committed to providing top-notch medical care for your horses. From routine check-ups to emergency services, your horse's health is our priority.
                        </CardContent>
                    </Card>
                    <Card className="w-[350px] m-5">
                        <CardHeader>
                            <CardTitle ><h1 className=''>Nutritional Support</h1></CardTitle>
                        </CardHeader>
                        <CardContent>
                            Ensure your horse receives the best nutrition with our carefully crafted diet plans. We understand that each horse is unique, and our nutritionists work to create personalized plans for optimal health.
                        </CardContent>
                    </Card>
                    <Card className="w-[350px] m-5">
                        <CardHeader>
                            <CardTitle ><h1 className=' text-'>Training Programs</h1></CardTitle>
                        </CardHeader>
                        <CardContent>
                            Whether you're looking to enhance your horse's skills or address specific behavioral issues, our expert trainers are here to assist. Tailored training programs focus on creating a strong bond between you and your horse.
                        </CardContent>
                    </Card>
                    <Card className="w-[350px] m-5">
                        <CardHeader>
                            <CardTitle ><h1 className=''>Grooming and Spa Services</h1></CardTitle>
                        </CardHeader>
                        <CardContent>
                            Treat your horse to a pampering experience with our grooming and spa services. From soothing baths to luxurious mane treatments, your horse will not only look great but feel fantastic too.
                        </CardContent>
                    </Card>
                    <Card className="w-[350px] m-5">
                        <CardHeader>
                            <CardTitle ><h1 className=''>Veterinary Care</h1></CardTitle>
                        </CardHeader>
                        <CardContent>
                            Our team of experienced veterinarians is committed to providing top-notch medical care for your horses. From routine check-ups to emergency services, your horse's health is our priority.
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='bg-green-200'>
                <div className='flex flex-col'><h1 className="  mb-6 mt-12 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-green-900  m-auto">Why Choose Us?</h1>
                </div>
                <div className='  h-1 bg-black rounded-full max-w-7xl m-auto mb-10'></div>
                <div className=' flex  justify-center items-center md:flex-row flex-col-reverse'>
                    <Card className="max-w-[500px] m-10 bg-green-100">
                        <CardHeader>
                            <CardTitle ><h1 className='text-bold text-xl'>Experience the Difference in Equine Care</h1></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className=" mx-auto">
                                <div className="">
                                    <div className="flex flex-col ">
                                        <h3 className="text-lg font-semibold mb-2">Passionate Experts</h3>
                                        <p className="text-gray-700 ">
                                            Our team comprises passionate horse lovers, including veterinarians, nutritionists, trainers, and groomers, all dedicated to the well-being of your horse.
                                        </p>
                                    </div>

                                    <div className="flex flex-col mt-4">
                                        <h3 className="text-lg font-semibold mb-2">Tailored Approach</h3>
                                        <p className="text-gray-700 ">
                                            We understand that every horse is unique. Our services are personalized to meet the specific needs of your equine companion, ensuring they receive the care they deserve.
                                        </p>
                                    </div>

                                    <div className="flex flex-col mt-4 ">
                                        <h3 className="text-lg font-semibold mb-2">Convenience</h3>
                                        <p className="text-gray-700 ">
                                            With our online platform, accessing top-notch horse care has never been easier. Browse services, book appointments, and manage your horse's care all in one place.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <img src='https://img.smartpak.com/images/04_health/girlHorseFence.jpg' />
                </div>
            </div>
        </>
    )
}

export default Main
