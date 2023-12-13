import { Button } from "../ui/button"
import { useNavigate } from 'react-router-dom';


type cardData = {
    id: number;
    title: string;
    shortDescription: string;
    price: number;
}

const Card = (param: cardData) => {
    const navigate = useNavigate();
    const routeChange = () => {
        const path = `/service?id=${param.id}`;
        navigate(path);
    }
    // console.log(param.title)
    return (
        <div className=" m-5">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow  ">
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{param.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 ">{param.shortDescription}</p>
                    <div className=" flex justify-between">
                        <div>
                            <div className=" font-bold bg-green-200 flex items-center justify-center px-3 py-1 rounded-full">
                                Price = ${param.price}/-
                            </div>
                        </div>
                        <Button variant={"green"} onClick={routeChange} >
                            Read more
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Card
