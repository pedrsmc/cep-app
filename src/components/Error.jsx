import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export function Error({ errorMessage, showError, setIsOpen }) {

    return (
        <div className="h-[70px] flex justify-center items-center fixed bottom-14 text-white shadow-lg">
            <div className="h-[100%] flex justify-center items-center bg-red-700 rounded-l-sm p-5">
                <p>{`${errorMessage}`}</p>
            </div>
            <button onClick={() => showError(setIsOpen(false))} className="h-[100%] bg-red-900 p-5 rounded-r-sm"><FontAwesomeIcon icon={faX} /></button>
        </div>
    )
}