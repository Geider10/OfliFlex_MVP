import { useState } from "react";
import styles from "../panel.module.css";
import { parse,isBefore, isAfter } from "date-fns";

function Filtro({ filterReservas, reservation}) {

  const [filtro, setFiltro] = useState('')

  const aplicarFiltro = (nuevoFiltro) => {
    console.log(nuevoFiltro);
    const hoy = new Date();
    const reservasFiltradas = reservation.filter((reserva) => {
      const fechaReserva = parse(reserva.fecha, "dd/MM/yyyy", new Date());
      if (nuevoFiltro === "activas") {
        return isAfter(fechaReserva, hoy); // Fecha futura
      } else if (nuevoFiltro === "finalizadas") {
        return isBefore(fechaReserva, hoy); // Fecha pasada o igual a hoy
      }
      return true;
    });
    filterReservas(reservasFiltradas);
    setFiltro(nuevoFiltro);
  };

  return (
      <select
        value={filtro}
        onChange={(e)=> {aplicarFiltro(e.target.value)}}
        className={styles.select}
      >
        <option value="activas">Activas</option>
        <option value="finalizadas">Finalizadas</option>
      </select>
  );
}

export default Filtro;