import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from "../../../../context/context.jsx";
//logica para hacer crear una reserva, POST
function PostDataDetail({ servicio, usuario, setIsSuccess, setReservaId, setIsLoading }) {

  const { authToken, msgError } = useContext(Context);

  const [postData, setPostData] = useState({
    servicioID: "",
    usuarioId: "",
    usuarioReserva: "",
    servicioReservado: "",
    fecha: ""
  });
  useEffect(() => {
    if (servicio && usuario) {

      setPostData({
        servicioID: servicio.servicioID,
        usuarioId: usuario._id,
        usuarioReserva: usuario.nombre,
        servicioReservado: servicio.titulo,
        fecha: servicio.fecha
      });
    }
  }, [servicio, usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post("http://127.0.0.1:3000/reservas", postData, {
      headers: {
        authorization: 'Bearer ' + authToken
      }
    })
      .then(response => {
        console.log('Respuesta:', response.data);
        setReservaId(response.data.reservaId);
        setIsSuccess(true);
      })
      .then(() => {
        console.log('Estado del servicio actualizado correctamente');
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
        msgError("Necesitas registrarte para eso");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return ({ handleSubmit })
}

export default PostDataDetail;

