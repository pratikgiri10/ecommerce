import React from 'react'

const LegendItem = ({ legendItems }) => {
    return (
        <div className='flex flex-col justify-center gap-2'>
            {legendItems.map((item) => (
                <div className='flex gap-2'>
                    <span className={`w-3 h-3`}
                        style={{
                            backgroundColor: item.fill
                        }}
                    ></span>
                    <p className='text-sm capitalize'>{item.category}</p>
                </div>
            ))}
        </div>
    )
}

export default LegendItem