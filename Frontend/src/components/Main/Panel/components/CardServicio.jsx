import styles from "../panel.module.css";
import { BiAlarm } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";
import {useState} from 'react';
import CancelServicio from './CancelServicio';
const CardServicio = ({imagen, titulo, fecha, hora, categoria, id}) => {
  
  const [dropDown, setDropDown] = useState(false)
  const handleDropDown = () =>{
    setDropDown(!dropDown)
  }
  const handleEdit = () =>{
    console.log('edit success');
  }
  return (
    <div className={styles.container_cardReserva}>
      <img className={styles.img_reserva} src={imagen} alt={titulo} />

      <div className={styles.container_text}>
        <div className={styles.info}>
          <h2 className={styles.title_card}>{titulo}</h2>
          <p className={styles.p_fecha}><BiCalendarAlt />{fecha}</p>
          <p className={styles.p_fecha}><BiAlarm />{hora}hs</p>
        </div>
      </div>
      <div className={styles.dropdown}>
              <p onClick={handleDropDown}>pp</p>
              {dropDown && 
              <nav className={styles.dropdown_menu}>
                <li onClick={handleEdit} className={styles.link}>Editar</li>
                <CancelServicio id={id}/>
              </nav>
            }
      </div>
    </div>
  )
}

export default CardServicio;