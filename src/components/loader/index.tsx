import {AiOutlineLoading3Quarters} from "react-icons/ai";

const Loader = () => {
    return (
        <div className='flex justify-center items-center gap-2 mt-2 mb-6'>
            <p className="text-2xl text-white">Loading</p>
            <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin"/>
        </div>
    )
}

export default Loader