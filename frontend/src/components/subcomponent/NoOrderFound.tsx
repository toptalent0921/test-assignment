
import { Button } from '../ui/button'
import { Card } from '../ui/card'

const NoOrderFound = () => {
    return (
        <div>

            <div className="flex items-center justify-center h-screen bg">
                <div className=" w-80 h-80 diffBorder absolute bg-green-200 top-10 rotate-90  -left-6"></div>
                <div className=" w-96 h-96 diffBorder absolute bg-green-200 top-40 rotate-45  right-24"></div>
                <div className=" w-40 h-40 diffBorder absolute bg-green-200 bottom-10 rotate-12  left-52"></div>
                <Card className='p-10'>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">No Order Found</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            We're sorry, but it seems that there are no order available at the moment.
                        </p>

                        <p className="text-gray-600">
                            Please check back later or explore other categories.
                        </p>
                        <Button variant='green' className='mt-10' > search now </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default NoOrderFound
