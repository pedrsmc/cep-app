import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export function Address({ item, closeAddress }) {

    return (
        <div className="md:w-[500px] flex items-center justify-between gap-3 text-white m-auto bg-slate-800 p-7 rounded-md shadow-md">
            <div className='flex flex-col gap-2'>
                <p className="text-2xl">{`${item.street}`}</p>
                <p className="text-xl">{`${item.nbh}`}</p>
                <p className="">{`${item.city} - ${item.state}`}</p>
                <p>{`${item.cep}`}</p>
            </div>
            <button onClick={() => closeAddress(item.id)} className='mb-28'>
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    )
}