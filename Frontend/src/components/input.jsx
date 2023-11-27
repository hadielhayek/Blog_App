import React, { useState } from 'react'

export default function input({name,type,id,value,placeholder,icon}) {
    
    const [passwordVisibility ,setpasswordVisibility]=useState(false)
  return (
    <div className='relative w-[100%] mb-4'>
        <input
        name={name}
        type={type =='password' ? passwordVisibility ? 'text' : "password" : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className='input-box'

        
        
        />
          <i className={"fi " + icon +  " input-icon"}></i>

          {
            type=='password' ? 
            <i
             className={`fi fi-rr-eye ${
                     !passwordVisibility ? "-crossed" : ""
                         } input-icon left-[auto] right-4 cursor-pointer`}
                  onClick={() => setpasswordVisibility(currentVal => !currentVal)}
            />

            : ""
          }
    </div>
  )
}
