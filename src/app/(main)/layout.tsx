import React from 'react'

function MainLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex flex-1 flex-col'>
      {children}
    </div>
  )
}

export default MainLayout
