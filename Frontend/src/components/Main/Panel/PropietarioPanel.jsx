import styles from "./panel.module.css";
import PostServicio from './components/PostServicio.jsx'
import CardServicio from './components/CardServicio.jsx'
import { useContext,useEffect,useState } from "react";
import Context from "../../../context/context.jsx";

const PropietarioPanel = () => {
  const { usuario,servicio } = useContext(Context);
  const [myServicios, setMyServicios] = useState()
  const [edit,setEdit] = useState(false)
  const [service, setService] = useState({})

  useEffect(()=>{
    setMyServicios(usuario.listaServicios)

  },[servicio,usuario])

  return (
    <div className={`${styles.container_prop_panel} ${styles.container_gralServicios}`}>
      <div className={styles.container_servicios}>
        <h2 className={styles.title}>Crear</h2>
        <PostServicio edit={edit} service={service} setEdit={setEdit}/>
      </div>

      <div className={styles.container_servicios}>
        <h2 className={styles.title}>Tus servicios</h2>
        {myServicios && myServicios.map((servicio,index) => (
          <CardServicio
          key={index}
          id={servicio.servicioID}
          imagen={servicio.imagen}
          titulo={servicio.titulo}
          fecha={servicio.fecha}
          hora={servicio.hora}
          categoria={servicio.categoria}
          descripcion = {servicio.descripcion}
          edit = {setEdit}
          service = {setService}
        />
        ))}
        
      </div>
    </div>
  )
}

export default PropietarioPanel