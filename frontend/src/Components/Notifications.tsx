interface CustomInputProps{
    indexVal: number,
    message: string,
    onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Alert({indexVal,message,onClose}:CustomInputProps){
    return(
        <div id={"alert-"+indexVal.toString()} className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <div className="ms-3 text-sm font-medium capitalize">
                {message}
            </div>
            <button type="button" key={indexVal}  onClick={onClose}  className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target={"#alert-"+indexVal.toString()} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                </svg>
            </button>
            
        </div>
    )
}

export function Info({indexVal,message,onClose}:CustomInputProps){
    return(
        <div id={"alert-"+indexVal.toString()} className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <div className="ms-3 text-sm font-medium capitalize">
                {message}
            </div>
            <button type="button" key={indexVal}  onClick={onClose}  className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target={"#alert-"+indexVal.toString()} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                </svg>
            </button>            
        </div>
    )
}


