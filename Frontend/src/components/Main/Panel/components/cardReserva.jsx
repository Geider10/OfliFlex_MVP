import { useState } from "react";
import styles from "../panel.module.css";
import { BiAlarm } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";
import Feedback from "./feedback";
import CancelReserva from "./CancelReserva";

const CardReserva = ({ imagen, titulo, fecha, hora, categoria, id, descripcion}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showInfo, setShowInfo] = useState(false)

  const handleToggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };
  const handleToggleInfo = () => {
    setShowInfo(!showInfo);
  };
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

          <div className={styles.container_end}>
            <nav>
              <li onClick={handleToggleInfo}> {showInfo ? 'Ocultar detalles': 'Ver detalles' } </li>
              <li onClick={handleToggleFeedback}> {showFeedback ? "Ocultar feedback" : "Ver feedback"}</li>
              <CancelReserva id={id}/>
            </nav>
          </div>
        </div>
      </div>

      {showFeedback && <Feedback id={id} />}
    </div>
  );
};

export default CardReserva;
