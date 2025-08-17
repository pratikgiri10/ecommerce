import React from 'react'
import '../../css/style.css'

const Loader = () => {
    return (
        <div className="flex h-[calc(100vh-2.5rem)] items-center justify-center">
            <div
                className='w-[3rem] h-[3rem]
                border-4 border-gray-200 rounded-full border-t-yellow-500 animate-spin'>

            </div>
        </div>
    )
}

export default Loader