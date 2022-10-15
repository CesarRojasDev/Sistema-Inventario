import { useSalida } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const ListSalida = () => {
  const { salidas, deleteSalida } = useSalida();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const filteredSalida = () => {
    if (search.length === 0)
      return salidas.slice(currentPage, currentPage + 10);

    const filtered = salidas.filter((salida) =>
      salida.nombreProducto.includes(search)
    );
    return filtered.slice(currentPage, currentPage + 10);
  };

  const nextPage = () => {
    if (
      salidas.filter((salida) => salida.nombreProducto.includes(search))
        .length >
      currentPage + 10
    )
      setCurrentPage(currentPage + 10);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 10);
  };

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className=' col-lg-12 mt-5'>
          <input
            type='text'
            className='mb-2 form-control'
            placeholder='Burcar Producto'
            value={search}
            onChange={onSearchChange}
          />
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Nombre Prodcuto</th>
                <th scope='col'>Cantidad</th>
                <th scope='col'>Fecha</th>
                <th scope='col'>Usuario</th>
                <th scope='col'>Area</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredSalida().map((salida) => (
                <tr key={salida.idSalida}>
                  <th scope='row'>{salida.idSalida}</th>
                  <td>{salida.nombreProducto}</td>
                  <td>{salida.cantidad}</td>
                  <td>{salida.fecha}</td>
                  <td>{salida.nombre}</td>
                  <td>{salida.nombreArea}</td>
                  <td>
                    <button
                      className='btn btn-warning m-2'
                      onClick={() => navigate(`/edit/${salida.idSalida}`)}
                    >
                      Editar
                    </button>

                    <button
                      className='btn btn-danger'
                      onClick={() => deleteSalida(salida.idSalida)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='d-flex justify-content-center'>
            <nav>
              <ul className='pagination'>
                <li className='page-item'>
                  <a className='page-link' onClick={prevPage}>
                    Anterior
                  </a>
                </li>
                <li className='page-item active'>
                  <a className='page-link'>{currentPage + 1}</a>
                </li>
                <li className='page-item'>
                  <a className='page-link' onClick={nextPage}>
                    Siguiente
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
