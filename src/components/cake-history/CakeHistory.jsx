import { useCakeContext} from '../../context/CakeProvider'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const CakeHistory = () => {
    const { cakes} = useCakeContext();

    return(
        <>
            <p className="text-white text-center mb-4">Cake History</p>
            <ul className="divide-y divide-gray-200">
                {Object.keys(cakes).map(cakeKey => (
                    <li key={cakeKey} className="flex py-2 text-white">
                        <span className='mr-2'>{cakes[cakeKey].name}</span>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                className="text-white hover:text-gray-300"
                                
                            >
                                <PencilIcon className="h-4 w-4 mr-1" />
                            </button>
                            <button
                                type="button"
                                className=" text-white hover:text-gray-300 "
                                
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CakeHistory;