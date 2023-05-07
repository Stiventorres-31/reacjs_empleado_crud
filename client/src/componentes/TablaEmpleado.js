import React from 'react'

export const TablaEmpleado = (props) => {
    
    return ( 
        <div>
            {<table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
       
        <tbody>
          {
            props.listaEmpleado.map((val, key) => {
              return <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anio}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => {
                      props.editar(val)
                    }} className="btn btn-info">Editar</button>
                    <button type="button" onClick={() => {
                      props.eliminar(val)
                    }} className="btn btn-danger">Eliminar</button>
                  </div>
                </td>

              </tr>

            })
          }
        </tbody>
      </table>}
        </div>
    )
}
