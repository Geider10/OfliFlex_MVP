import styles from "./panel.module.css";
import { useContext,useEffect, useState } from "react";
import Context from "../../../context/context.jsx";
import CardReserva from "./components/cardReserva.jsx";
import { parse, isAfter, isBefore} from "date-fns";

const UsuarioPanel = () => {
const { usuario, servicios } = useContext(Context);
const [filtro, setFiltro] = useState('activas');
const [reservas, setReservas] = useState([])
const [reservasFiltradas, setReservasFiltradas] = useState([]); // Para almacenar las reservas filtradas

const filtroFechaReservas = (nuevoFiltro) => {
  const hoy = new Date();
  const reservasData = reservas.filter((reserva) => {
    if (!reserva.fecha) {
      console.log(`La reserva con ID ${reserva.id || "desconocido"} no tiene fecha.`);
      return false;
    }

    // Parsear la fecha al formato correcto y aplicar filtro
    const fechaReserva = parse(reserva.fecha.trim(), "dd/MM/yyyy", new Date());
    if (nuevoFiltro == "activas") {
      return isAfter(fechaReserva, hoy); // Fecha futura
    } else if (nuevoFiltro == "finalizadas") {
      return isBefore(fechaReserva, hoy); // Fecha pasada
    }

    return true;
  });
  setReservasFiltradas(reservasData);
};

  useEffect(() => {
    if(!usuario.listaReservas) return 
    const dataUser = usuario.listaReservas
    const data = dataUser.map((reserva) => {
      // Buscar el servicio correspondiente a la reserva
      const servicio = servicios.find(s => s.servicioID.toString() == reserva.servicioID.toString());
      return servicio 
    })
    setReservas(data)
    //filtroFechaReservas(filtro);
  }, [usuario.listaReservas,usuario.listaServicios,servicios]);
  
  return (
    <div className={styles.container_user_panel}>
      <div className={styles.container_reservas}>
        <h2 className={styles.title}>Reservas</h2>
        <select
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value); 
            filtroFechaReservas(e.target.value); 
          }}
          className={styles.select}
        >
          <option value="activas">Activas</option>
          <option value="finalizadas">Finalizadas</option>
        </select>

        { reservasFiltradas.length > 0 ? reservasFiltradas.map((servicio, index) => {
          return (
            <CardReserva
              key={index}
              id={servicio.servicioID}
              imagen={servicio.imagen}
              titulo={servicio.titulo}
              fecha={servicio.fecha}
              hora={servicio.hora}
              categoria={servicio.categoria}
              descripcion={servicio.descripcion}
            />
          );
        }) 
      : <p> No hay reservas</p>}
      </div>
    </div>
  );

}
export default UsuarioPanel;
