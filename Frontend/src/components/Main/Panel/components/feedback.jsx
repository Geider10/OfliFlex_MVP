import styles from "../panel.module.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Context from "../../../../context/context.jsx";
import { FaPenToSquare } from "react-icons/fa6";
const feedback = ({ id }) => {
  const { authToken} = useContext(Context);
  const [feedback, setFeedback] = useState("");
  const [reserva, setReserva] = useState(null);
  const [editFeedback, setEditFeedback] = useState(false)
  useEffect(() => {
    const getReservas = async () => {
      try {
        const reservas = await axios.get('http://localhost:3000/reservas',
          {headers : {
            Authorization: `Bearer ${authToken}`
          }}
        )
        const newReserva = reservas.data.find(r => r.servicioID == id)
        setReserva(newReserva);
        setFeedback(newReserva.feedback || "");
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    }
   
    getReservas()
  }, [id, authToken]);

  const handleSubmit = async (statusEdit, valueFeedback) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/reservas/${reserva.reservaId}`,
        { feedback : valueFeedback },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setReserva((prev) => ({ ...prev, feedback: response.data.feedback || valueFeedback }));
      setEditFeedback(statusEdit)
    } catch (error) {
      console.error("Error al enviar el feedback:", error);
    }
  };

  if (!reserva) {
    return <div>Cargando reserva...</div>;
  }

  return (
    
    <div className={styles.container_feedback}>
      <div className={styles.feedback_title}>
      <h3 className={styles.title_card}>Feedback</h3>
         {(editFeedback || reserva.feedback) && <FaPenToSquare onClick={()=> handleSubmit(false, '')} className={styles.feedback_title_edit}/>}
      </div>
      
      {reserva.feedback ? (
         <p>{reserva.feedback}</p>
      ) : (
          <div className={styles.container_form}>
            <textarea
              id='output'
              className={styles.textarea_feedback}
              placeholder="Coméntanos..."
              name="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button className={styles.btn_calificar} onClick={()=>handleSubmit(true,feedback)}>Enviar</button>
        </div>
      )}
    </div>
  );
}

export default feedback