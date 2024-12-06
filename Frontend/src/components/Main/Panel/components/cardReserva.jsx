import { useState } from "react";
import styles from "../panel.module.css";
import { BiAlarm } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";
import Feedback from "./feedback";
import CancelReserva from "./CancelReserva";

const CardReserva = ({ imagen, titulo, fecha, hora, categoria, id, descripcion}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showInfo, setShowInfo] = useState(false)
  const [dropDown, setDropDown] = useState(false)

  const handleToggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };
  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };
  const handleDropDown = () => {
    setDropDown(!dropDown)
  }
  return (
    <div className={styles.container_cardReserva}>
      <div className={styles.container_card}>
        <img className={styles.img_reserva} src={imagen} alt={titulo} />

        <div className={styles.container_text}>
          <div className={styles.info}>
            <h2 className={styles.title_card}>{titulo}</h2>
            {showInfo && <p>{categoria}</p>}
            <p className={styles.p_fecha}><BiCalendarAlt />{fecha}</p>
            <p className={styles.p_fecha}><BiAlarm />{hora}hs</p>
            {showInfo &&  <p>{descripcion}</p>}
          </div>

          <div className={styles.dropdown}>
            <p className={''} onClick={handleDropDown}>pp</p>
            {dropDown && 
              <nav className={styles.dropdown_menu}>
                <li onClick={handleToggleInfo} className={styles.link}> {showInfo ? 'Ocultar detalles': 'Ver detalles' } </li>
                <li onClick={handleToggleFeedback} className={styles.link}> {showFeedback ? "Ocultar feedback" : "Ver feedback"}</li>
                <CancelReserva id={id}/>
              </nav>}
          </div>
        </div>
      </div>

      {showFeedback && <Feedback id={id} />}
    </div>
  );
};

export default CardReserva;
