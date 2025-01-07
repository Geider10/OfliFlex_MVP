import { useContext, useEffect, useState,useRef } from 'react';
import styles from '../panel.module.css'
import axios from 'axios';
import Context from "../../../../context/context.jsx";
import { ToastContainer } from "react-toastify";
import {useForm} from 'react-hook-form';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const ServicioForm = ({edit,service,setEdit}) => {
    const { authToken, usuario, msgSuccess} = useContext(Context);
    const {register, handleSubmit, reset, setValue } = useForm()
    const [preview, setPreview] = useState(null)

    useEffect(()=>{
        if(edit){
            setValue('imagen',service.imagen)
            setValue('titulo',service.titulo)
            setValue('fecha',service.fecha)
            setValue('hora',service.hora)
            setValue('categoria',service.categoria)
            setValue('descripcion',service.descripcion)
        }
    },[edit])
    const onSubmit = async (formData) => {
        const newData = {...formData, userId : usuario._id}
        try {
            if(edit){
                await axios.put(`${BACKEND_URL}/servicios/${service.id}`,formData,
                    {
                        headers:{
                            Authorization : `Bearer ${authToken}`
                        }
                    }
                )
                msgSuccess('Se edito el servicio con éxito')
                setEdit(false)
            }
            else{
                await axios.post(`${BACKEND_URL}/servicios`, newData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + authToken
                        }
                    }
                );
                msgSuccess('Se creo un servicio con éxito')
            }
            reset()
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
      };
    return (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.card_info}>
                    <div className={styles.img_servicio}>
                        <div className={styles.container_img_servicio}>
                            <img src={preview ? preview : '/user-profile-unloggin.webp'} alt="vista previa de la imagen" className={styles.img_user}/>
                        </div>
                        <label htmlFor="file"  className={styles.input_img} >Cargar imagen</label>
                        <input id='file' type="file"  accept="image/*"  onChange={handleFileChange} style={{display:'none'}}
                            {...register('imagen',{
                                required : {value: true, message:'Imagen es requerida'}
                            })}
                        />
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
