//SE INSTALÓ
//AXIOS PARA HACER PETIONES - NPM INSTALL AXIOS
// BOOTSTRAP - REACT-BOOTSTRAP BOOTSTRAP
//sweetalert2

import './App.css';
import { useState } from 'react'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
function App() {
  const [id, setId] = useState()
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState()
  const [pais, setPais] = useState("")
  const [cargo, setCargo] = useState("")
  const [anio, setAnio] = useState()
  const [editar, setEditar] = useState(false)

  const [empleadosList, setEmpleados] = useState([]);

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anio: anio,
      id: id
    }).then(() => {
      limpiarCampo();
      getEmpleados();
      Swal.fire({
        title: "<strong>Actualización exitosa</strong>",
        html: '<i>El empleado <strong>' + nombre + '</strong> fue actualizado con exito</i>',
        icon: 'success',
        timer: 1000
      })
      
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró actualizar el empleado',
        footer: error['message']==="Network Error"?"Intente más tarde":error['message']
      })
    })
  }


  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anio: anio
    }).then(() => {
      getEmpleados();
      limpiarCampo();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: '<i>El empleado <strong>' + nombre + '</strong> fue registrado con exito</i>',
        icon: 'success',
        timer: 1000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logró registrar el empleado',
        footer: error['message']==="Network Error"?"Intente más tarde":error['message']
      })
    })
  }
  const eliminar = (val) => {

    Swal.fire({
      title: 'Confirmar eliminado?',
      html: '<i>Realmente desea eliminar este empleado <strong>' + val.nombre + '</strong> ?</i>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampo();

          Swal.fire({
            title:'Eliminado!',
            html:'<strong>' + val.nombre + '</strong> fue eliminado!!',
            icon: 'success',
            timer: 2000
          })
          
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el empleado',
            footer: error['message']==="Network Error"?"Intente más tarde":error['message']
          })
        })
      }
    })
  }


  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  }
  getEmpleados();

  const editarEmpleado = (val) => {
    setEditar(true)

    setId(val.id)
    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setAnio(val.anio)


  }
  const limpiarCampo = () => {
    setId("")
    setNombre("")
    setEdad("")
    setPais("")
    setCargo("")
    setAnio("")
    setEditar(false)
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text" value={nombre}
              onChange={e => {
                setNombre(e.target.value)
              }}
              className="form-control" placeholder="Ingrese el nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad:</span>
            <input type="number" value={edad}
              onChange={e => {
                setEdad(e.target.value)
              }}
              className="form-control" placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais:</span>
            <input type="text" value={pais}
              onChange={e => {
                setPais(e.target.value)
              }}
              className="form-control" placeholder="Ingrese el pais" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo:</span>
            <input type="text" value={cargo}
              onChange={e => {
                setCargo(e.target.value)
              }}
              className="form-control" placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Experiencia:</span>
            <input type="number" value={anio}
              onChange={e => {
                setAnio(e.target.value)
              }}
              className="form-control" placeholder="Ingrese la experiencia" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

        </div>
        <div className="card-footer text-muted">
          {
            editar ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampo}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>

          }

        </div>
      </div>

      <table className="table table-striped">
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
            empleadosList.map((val, key) => {
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
                      editarEmpleado(val)
                    }} className="btn btn-info">Editar</button>
                    <button type="button" onClick={() => {
                      eliminar(val)
                    }} className="btn btn-danger">Eliminar</button>
                  </div>
                </td>

              </tr>

            })
          }
        </tbody>
      </table>

    </div>
  );
}

export default App;
