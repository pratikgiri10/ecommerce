import React from 'react'
import '../../css/style.css'

const Loader = () => {
    return (
        <div className="flex h-[calc(100vh-2.5rem)] items-center justify-center">
            <div
                className='w-[3rem] h-[3rem]
                border-2 border-gray-200 rounded-full border-t-black animate-spin'>

            </div>
        </div>
    )
}

export default Loader