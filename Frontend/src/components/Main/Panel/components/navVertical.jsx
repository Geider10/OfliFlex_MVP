import ImageUploader from "./ImageUploader";
import { useContext, useState } from "react";
import Context from "../../../../context/context";
import styles from "../panel.module.css"
import PostUser from './PostUser';

const NavVertical = () => {
  const { usuario } = useContext(Context);
  const [edit, setEdit] = useState(false)

  const handleActivateEdit  = () =>{
    setEdit(!edit)
  }

  return (
    <div className={styles.container_nav}>
     
      <ImageUploader />
      {!edit ? 
        <div className={styles.container_more_info}>
          <div className={styles.more_info}>
            <div><b>Email:</b> {usuario.email}</div>
            <div><b>Edad:</b> {usuario.edad}</div>
            <div><b>Teléfono:</b> {usuario.telefono}</div>
            <button className={styles.btn_edit} onClick={handleActivateEdit}>Editar</button>
          </div>
        </div>
      : 
        <PostUser btnEdit={handleActivateEdit}/>
      }

    </div>
  );
};

export default NavVertical;