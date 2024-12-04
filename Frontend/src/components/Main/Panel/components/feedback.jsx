import styles from "../panel.module.css";
import { TiStar } from "react-icons/ti";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Context from "../../../../context/context.jsx";

const feedback = ({ id }) => {
  const { authToken} = useContext(Context);
  const [feedback, setFeedback] = useState("");
  const [reserva, setReserva] = useState(null);
  const [idRes, setIdRes] = useState('')
  useEffect(() => {
    const getReservas = async () => {
      try {
        const reservas = await axios.get('http://localhost:3000/reservas',
          {headers : {
            Authorization: `Bearer ${authToken}`
          }}
        )
        const idReserva = reservas.data.find(r => r.servicioID == id)
        setIdRes(idReserva.reservaId)
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    }
   
    getReservas()
  }, [id, authToken]);

  useEffect(()=>{
    if (!idRes) return; // Evita ejecutar si `idRes` no está definido
    const getReservaId = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reservas/${idRes}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setReserva(response.data);
        setFeedback(response.data.feedback || "");
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
      }
    };
    getReservaId();

  },[idRes,authToken])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/reservas/${idRes}`,
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setReserva((prev) => ({ ...prev, feedback: response.data.feedback || feedback }));
    } catch (error) {
      console.error("Error al enviar el feedback:", error);
    }
  };

  if (!reserva) {
    return <div>Cargando reserva...</div>;
  }

  return (
    
    <div className={styles.container_feedback}>
      <h3 className={styles.title_card}>
        <TiStar className={styles.star} /> Feedback:
      </h3>
     
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
            <button className={styles.btn_calificar} onClick={handleSubmit}>
              Enviar
            </button>

        </div>
      )}
    </div>
  );
}

export default feedback