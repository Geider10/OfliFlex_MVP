import styles from "../panel.module.css";
import { BiAlarm } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";
import {useState} from 'react';
import CancelServicio from './CancelServicio';
import { FaEllipsisVertical } from "react-icons/fa6";
const CardServicio = ({imagen, titulo, fecha, hora, categoria,descripcion, id,edit,service}) => {
  
  const [dropDown, setDropDown] = useState(false)
  const handleDropDown = () =>{
    setDropDown(!dropDown)
  }
  const handleEdit = () =>{
    const contentService = {
      'id' : id,
      'titulo' : titulo,
      'fecha' : fecha,
      'hora' : hora,
      'imagen' : imagen,
      'categoria' : categoria,
      'descripcion' : descripcion
    }
    service(contentService)
    edit(true)
    setDropDown(false)

  }
  return (
    <div className={styles.container_cardReserva}>
      <div className={styles.container_card}>
        <img className={styles.img_reserva} src={imagen} alt={titulo} />

        <div className={styles.container_text}>
          <div className={styles.info}>
            <h2 className={styles.title_card}>{titulo}</h2>
            <p className={styles.p_fecha}><BiCalendarAlt />{fecha}</p>
            <p className={styles.p_fecha}><BiAlarm />{hora}hs</p>
          </div>
          <div className={styles.dropdown}>
            <FaEllipsisVertical onClick={handleDropDown} />
            {dropDown && 
            <nav className={styles.dropdown_menu}>
              <li onClick={handleEdit} className={styles.link}>Editar</li>
              <CancelServicio id={id}/>
            </nav>
          }
          </div>
        </div>
       
      </div>
    </div>
  )
}

export default CardServicio;