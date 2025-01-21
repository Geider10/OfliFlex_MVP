import styles from './ServicioDetail.module.css'
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import Context from '../../../context/context.jsx';
import ReservarServicio from './componentes/ReservarSercioDetail.jsx';
import { BtnBack } from './componentes/BtnBack.jsx';
import { ComprobanteReserva } from './componentes/ComprobanteReserva.jsx';
import { Button, Stack } from '@chakra-ui/react'
import { ToastContainer } from "react-toastify";

const ServicioDetail = () => {
  const { servicios, usuario } = useContext(Context);
  const { id } = useParams();
  const servicio = servicios.find((servicio) => servicio.servicioID === id);

  const [isSuccess, setIsSuccess] = useState(false)
  const [reservaId, setReservaId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit } = ReservarServicio({ servicio, usuario, setIsSuccess, setReservaId, setIsLoading });

  return (
    <>
      {!isSuccess && servicio ? (
        <div className={styles.container}>
          <BtnBack></BtnBack>
          {/* Parte de imagenes */}
          <div className={styles.center_column}>
            <img src={servicio.imagen} className={styles.img} alt = 'imagen detalladas del servicio'/>
            <div className={styles.center_row}>
              <img src={servicio.imagen} className={`${styles.img_abajo}`} alt = 'imagen detalladas del servicio'/>
              <img src={servicio.imagen} className={`${styles.img_abajo}`} alt = 'imagen detalladas del servicio'/>
              <img src={servicio.imagen} className={`${styles.img_abajo}`} alt = 'imagen detalladas del servicio'/>
            </div>
          </div>
          {/* Parte de texto */}
          <div className={styles.container_text}>
            <div>
              <h1 className={styles.titulo}>{servicio.titulo}</h1>
              <p>{servicio.descripcion}</p>
            </div>
            <div className={styles.center_row}>
              <span className={styles.fecha_hora}>{servicio.fecha}</span>
              <span className={styles.fecha_hora}>{servicio.hora}</span>
            </div>
            <form onSubmit={handleSubmit}>
              <Stack>
                <Button
                  isLoading={isLoading}
                  loadingText='Cargando datos'
                  colorScheme='teal'
                  variant='outline'
                  spinnerPlacement='end'
                  type='submit'
                  className={styles.btn}
                >
                  Confirmar reserva
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      ) : (
        <ComprobanteReserva usuario={usuario} servicio={servicio} reservaId={reservaId} />
      )}
      <ToastContainer />
    </>
  );
};

export default ServicioDetail;
