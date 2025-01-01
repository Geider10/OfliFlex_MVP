import axios from 'axios';
import {useContext,useState,useEffect} from 'react';
import Context from '../../../../context/context';
import styles from "../panel.module.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const CancelReserva = ({id}) => {
    const {authToken} = useContext(Context)
    const [reserva, setReserva] = useState(null);

    useEffect(() => {
      const getReservas = async () => {
        try {
          const reservas = await axios.get(`${BACKEND_URL}/reservas`,
            {headers : {
              Authorization: `Bearer ${authToken}`
            }}
          )
          const newReserva = reservas.data.find(r => r.servicioID == id)
          setReserva(newReserva)
        } catch (error) {
          console.error("Error al obtener las reservas:", error);
        }
      }
     
      getReservas()
    }, [id, authToken]);

    const handleCancelReserva = async () => {
        try { 
          await axios.put(`${BACKEND_URL}/reservas/cancel/${reserva.reservaId}`,
            {headers:{
              Authorization : `Bearer ${authToken}`
            }}
          ) 
        } catch (error) {
          console.error('Error al cancelar una reserva ', error);
        }
    }

    return (
        <li onClick={handleCancelReserva} className={styles.link}>Cancelar</li>
    )
} 
export default CancelReserva