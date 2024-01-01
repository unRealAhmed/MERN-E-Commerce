import { useContext } from 'react'
import styles from './Sidebar.module.css'
import { Menu } from '../../context/Sidebarcontext'
import { IoMdClose } from "react-icons/io";

function Sidebar() {
    const menu=useContext(Menu);
    const isopened=menu.isopened;
    const setisopened=menu.setisopened;
  return (
    <div style={{display: isopened? 'block' :'none'}} className={styles.sidebar}>
        <div className={styles.close}>
            <IoMdClose onClick={()=>setisopened((prev)=>!prev)}/>
        </div>
        <div style={{paddingLeft:'5rem'}}>
        <h3 style={{paddingTop:'0.7rem'}}>Shop by categeory</h3>
        <ul>
            <li>Bages</li>
            <li>Mens</li>
            <li>Shoses</li>
            <li>Purfums</li>
        </ul>
        </div>
    </div>
  )
}

export default Sidebar