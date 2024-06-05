import React, { ReactNode } from 'react'
import { EventsTabContextProvider } from './ui/EventsTabContext'

const layout = ({children}: Readonly<{children: ReactNode}>) => {
  return (
    <div className='w-full h-full'>
        <EventsTabContextProvider>
        {children}
        </EventsTabContextProvider>
    </div>
  )
}

export default layout