import { useRef, useContext, useState } from "react";
import axios from 'axios';
import Context from "../../../../context/context.jsx";
import styles from "../panel.module.css"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const ImageUploader = () => {
  const { authToken, usuarioId, usuario } = useContext(Context);
  const [imageUrl, setImageUrl] = useState(usuario.imagenUrl);
  const inputFile = useRef(null);

  if (!usuario) {
    return <div>Loading...</div>;
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const data = {
      avatar: file,
      token: authToken,
      usuarioId: usuarioId
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, data, {
        headers: {
          'Authorization': 'Bearer ' + authToken,
          'Content-Type': 'multipart/form-data'
        }
      });
      setImageUrl(response.data.imagenUrl);
      console.log('Respuesta:', response.data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleUploadClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    inputFile.current.click();
  };

  return (
    <div className={styles.container_portada_perfil}>

      {imageUrl ? (
        <div className={styles.container_img_perfil}>
          <img src={imageUrl} alt="Uploaded avatar" className={styles.img_user} />
        </div>
      ) : (
        <div className={styles.container_img_perfil}>
          <img src="/user-profile-unloggin.png" alt="Null avatar" className={styles.img_user} />
        </div>
      )}


      <div className={styles.custom_file_upload}>
        <h2 className={styles.text_name}>{usuario.nombre}</h2>
        <p>Perfil de {usuario.rol}</p>
        <label htmlFor="file-input" className={styles.file_label} onClick={handleUploadClick}>
          Subir archivo
        </label>
        <input id="file-input" type="file" ref={inputFile} style={{ display: 'none' }} onChange={handleFileChange} />
      </div>

      
    </div>
  );
};

export default ImageUploader;
