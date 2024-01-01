import  { createContext, useState } from 'react'
export const Menu=createContext('')

function Sidebarcontext({children}) {

    const [isopened,setisopened]=useState(false);

  return (
    <Menu.Provider value={{isopened,setisopened}}>{children}</Menu.Provider>
  )
}

export default Sidebarcontext