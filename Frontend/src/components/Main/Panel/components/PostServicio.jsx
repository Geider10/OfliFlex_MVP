import { useContext, useEffect, useState } from 'react';
import styles from '../panel.module.css'
import axios from 'axios';
import Context from "../../../../context/context.jsx";
import { ToastContainer } from "react-toastify";
import {useForm} from 'react-hook-form';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const ServicioForm = ({edit,service,setEdit}) => {
    const { authToken, usuario, msgSuccess} = useContext(Context);
    const {register, handleSubmit, reset, setValue } = useForm()
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(()=>{
        if(edit){
            setValue('titulo',service.titulo)
            setValue('fecha',service.fecha)
            setValue('hora',service.hora)
            setValue('categoria',service.categoria)
            setValue('descripcion',service.descripcion)
            setPreview(service.imagen)
        }
    },[edit])
    const onSubmit = async (formData) => {
        const newData = {...formData, userId : usuario._id, avatar: file}
        try {
            if(edit){
                const editData = {...formData,avatar:file}
                console.log(editData)
                await axios.put(`${BACKEND_URL}/servicios/${service.id}`,editData,
                    {
                        headers:{
                            Authorization : `Bearer ${authToken}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                msgSuccess('Se edito el servicio con éxito')
                setEdit(false)
            }
            else{
                console.log(newData);
                await axios.post(`${BACKEND_URL}/servicios`, newData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + authToken,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                msgSuccess('Se creo un servicio con éxito')
            }
            reset()
            setPreview(null)
        } catch (error) {
            console.error('Error al crear el servicio:', error);
        }
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result); // Resultado en base64
          reader.onerror = (error) => reject(error);
        });
      };
    
      // Manejar el cambio del archivo
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPreview(base64); // Actualiza la vista previa con el base64
        setFile(file);
      };
    return (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.card_info}>
                    <div className={styles.img_servicio}>
                        <div className={styles.container_img_servicio}>     
                            <img src={preview || '/service-img-empty.webp'} alt="vista previa de la imagen" className={styles.img_user}/>
                        </div>
                        <label htmlFor="file-img"  className={styles.input_img} >Subir</label>
                        <input id='file-img' type="file"  accept="image/*" style={{display:'none'}} onChange={handleFileChange} />
                    </div>
                    <div className={styles.inputs_textContainer}>
                        <div className={styles.inputs_conjunto}>
                            <div className={styles.div_inputs}> 
                                <input type="text" placeholder='Título' className={styles.inputs}
                                    {...register('titulo',{
                                        required : {value : true, message: 'Tittulo es requerido'},
                                        minLength : {value : 3, message : 'Ingresar minimo 3 digitos'}
                                    })}
                                />
                            </div>
                            <div  className={styles.div_inputs}>
                                <input type="text"  placeholder='Fecha (DD/MM/AAAA)'  className={styles.inputs}
                                    {...register('fecha',{
                                        required : {value: true, message:'Fecha es requerida'}
                                    })}
                                />
                            </div>
                            <div  className={styles.div_inputs}>
                                <input type="text" placeholder='Hora (HH:MM-HH:MM)' className={styles.inputs} 
                                    {...register('hora',{
                                        required : {value: true, message:'Hora es requerida'}
                                    })}
                                />
                            </div>

                        </div>
                        <div>
                            <input type="text" placeholder='Descripción' className={styles.inputs}
                                {...register('descripcion',{
                                    required : {value : true, message : 'Descripcion es requerida'},
                                    minLength : {value : 10, message : 'Mínimo 10 digitos'}
                                })}
                            />
                        </div>
                        <div>
                            <select className={styles.inputs} 
                                {...register('categoria')}
                            >
                                <option value='' disabled>Categoría</option>
                                <option value="Oficinas">Oficinas</option>
                                <option value="Salas">Salas</option>
                                <option value="Eventos">Eventos</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={styles.btn_container}>
                    <button type="submit" className={styles.btn}>{!edit ?'Crear' : 'Editar' }</button>
                </div>
                <ToastContainer/>
            </form>
    );
};

export default ServicioForm;
