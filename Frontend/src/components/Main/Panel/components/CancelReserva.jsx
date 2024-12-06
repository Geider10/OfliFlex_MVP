import axios from 'axios';
import {useContext,useState,useEffect} from 'react';
import Context from '../../../../context/context';
import styles from "../panel.module.css";

const CancelReserva = ({id}) => {
    const {authToken} = useContext(Context)
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
        } catch (error) {
          console.error("Error al obtener la reserva:", error);
        }
      };
      getReservaId();
  
    },[idRes,authToken])

    const handleCancelReserva = async () => {
        try {
          await axios.put(`http://localhost:3000/reservas/cancel/${reserva.reservaId}`,
            {headers:{
              Authorization : `Bearer ${authToken}`
            }}
          ) 
          console.log('reserva cancelada con exito');
        } catch (error) {
          console.error('Error al cancelar una reserva ', error);
        }
    }

    return (
        <li onClick={handleCancelReserva} className={styles.link}>Cancelar</li>
    )
} 
export default CancelReserva