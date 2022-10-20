import { createEntradaRequest } from '../../../api/entrada.api';
import { EntradaProducto } from './EntradaProducto';
import { FormLayout } from '../../Layout/FormLayout';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useUsuarios } from '../../../hooks';
import { useState } from 'react';
import * as YUP from 'yup';
export const EntradaRegistro = () => {
  const { usuarios } = useUsuarios();
  const [existProducto, setExistProducto] = useState(false);
  const formik = useFormik({
    initialValues: {
      fecha: '',
      usuarioEntrada: '',
    },
    validationSchema: YUP.object({
      fecha: YUP.date().required('La fecha  es requerida'),
      usuarioEntrada: YUP.string().required('El usuario es requerido'),
    }),

    onSubmit: async (values) => {
      console.log(values);
      try {
        if (existProducto === false) {
          return Swal.fire({
            title: 'Error!',
            text: 'La entrada necesita productos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
        const response = await createEntradaRequest(values);
        Swal.fire({
          title: 'Success!',
          text: 'Se ha registrado una entrada',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        formik.resetForm();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: { error },
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    },
  });

  return (
    <>
      <FormLayout title='Registrar Entrada'>
        <form onSubmit={formik.handleSubmit}>
          <label>Fecha</label>
          <input
            label=''
            type='date'
            placeholder=''
            name='fecha'
            className='form-control my-4 py-2'
            value={formik.values.fecha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fecha && formik.errors.fecha ? (
            <div className='alert alert-danger'>{formik.errors.fecha}</div>
          ) : null}
          <label>Usuario</label>
          <select
            label='Usuario'
            name='usuarioEntrada'
            className='form-control my-4 py-2'
            value={formik.values.usuarioEntrada}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {usuarios.map((usuario) => (
              <option key={usuario.idUsuario} value={usuario.idUsuario}>
                {usuario.nombre +
                  ' ' +
                  usuario.apellidoPaterno +
                  ' ' +
                  usuario.apellidoMaterno}
              </option>
            ))}
          </select>
          {formik.touched.usuarioEntrada && formik.errors.usuarioEntrada ? (
            <div className='alert alert-danger'>
              {formik.errors.usuarioEntrada}
            </div>
          ) : null}

          <div className='text-center my-5'>
            <button className='btn btn-primary btn-lg' type='submit'>
              Registrar
            </button>
          </div>
        </form>
      </FormLayout>

      <EntradaProducto setExistProducto={setExistProducto} />
    </>
  );
};
