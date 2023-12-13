import { supabase } from "../../lib/helper/supabaseClient";


const Table = () => {
    console.log('====================================');
    console.log(supabase);
    console.log('====================================');
    type data = {
        senders: string;
        recipients: string;
        transactionId: string;
    }[]
    const array: data = [
        {
            senders: "diwakar",
            recipients: "kuchbhi",
            transactionId: "fucjhruvubv"
        }, {
            senders: "diwakar",
            recipients: "kuchbhi",
            transactionId: "fucjhruvubv"
        }, {
            senders: "diwakar",
            recipients: "kuchbhi",
            transactionId: "fucjhruvubv"
        }, {
            senders: "diwakar",
            recipients: "kuchbhi",
            transactionId: "fucjhruvubv"
        }, {
            senders: "diwakar",
            recipients: "kuchbhi",
            transactionId: "fucjhruvubv"
        }, {
            senders: "diwakar",
            recipients: "kuchbhi",
            transactionId: "fucjhruvubv"
        },
    ]
    return (
        <div>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs  uppercase bg-gray-200 text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    From
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Recipient
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount (ETH)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction Hash
                                    {/* </th>
                <th scope="col" className="px-6 py-3">
                    Action */}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {array.map((res, index) => {

                                if (index % 2 == 0) {
                                    return (
                                        <tr key={index} className=" border-b bg-gray-200 border-gray-300">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium  whitespace-nowrap text-gray-700"
                                            >
                                                {res.senders}
                                            </th>
                                            <td className="px-6 py-4">
                                                {res.recipients}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.recipients}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.transactionId}
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return (
                                        <tr key={index} className="border-b bg-gray-100 border-gray-200">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium  whitespace-nowrap text-gray-700"
                                            >
                                                {res.senders}
                                            </th>
                                            <td className="px-6 py-4">
                                                {res.recipients}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.recipients}
                                            </td>
                                            <td className="px-6 py-4">
                                                {res.transactionId}
                                            </td>
                                        </tr>
                                    )
                                }
                            })}

                        </tbody>
                    </table>
                </div>

                {/* <button className='bg-white' onClick={trans}>data</button> */}
            </div>
        </div>
    )
}

export default Table
