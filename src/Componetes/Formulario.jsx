import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { nanoid } from 'nanoid';

const Formulario = () => {

    const objPersona = {
        nombres: '',
        apellidos: '',
        profesion: '',
        edad: ''
    }

    const [persona, setPersona] = useState(objPersona);
    const [lista, setLista] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('')
    const [error, setError] = useState(null);


    useEffect(() => {
        const obtenerDatos = async () => {
            try {

                const db = firebase.firestore()
                const data = await db.collection('personas').get()
                const array = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))

                setLista(array)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerDatos()
    })


    const guardarDatos = async (e) => {
        e.preventDefault()

        if (!persona.nombres) {
            setError('Ingrese El Nombre');
            return
        }

        if (!persona.apellidos) {
            setError('Ingrese El Apellido');
            return
        }

        if (!persona.profesion) {
            setError('Ingrese Su Profesion');
            return
        }

        if (!persona.edad) {
            setError('Ingrese Su Edad');
            return
        }

        try {

            const db = firebase.firestore();
            const nuevaPersona = {
                ...persona,
            }

            await db.collection('personas').add(nuevaPersona);

            setLista([...lista,
            { id: nanoid(), ...persona }
            ])

        } catch (error) {
            console.log(error)
        }

        setModoEdicion(false)
        setPersona(objPersona)
        setError(null)

    }

    const confirmarEliminar = (id) => {
        let opcion = window.confirm('¿Está seguro que desea eliminar?')

        if (!opcion) {
        } else {

            eliminar(id);
        }

    }

    const eliminar = async (id) => {
        try {
            const db = firebase.firestore()
            await db.collection('personas').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        } catch (error) {
            console.log(error)
        }
    }

    const auxEditar = (item) => {

        const objPersona = {
            nombres: item.nombres,
            apellidos: item.apellidos,
            profesion: item.profesion,
            edad: item.edad,
        }

        setPersona(objPersona);
        setModoEdicion(true);
        setId(item.id);

    }

    const editar = async e => {
        e.preventDefault()

        if (!persona.nombres) {
            setError('Ingrese El Nombre');
            return
        }

        if (!persona.apellidos) {
            setError('Ingrese El Apellido');
            return
        }

        if (!persona.profesion) {
            setError('Ingrese La Profesion');
            return
        }

        if (!persona.edad) {
            setError('Ingrese Su Edad');
            return
        }

        try {


            const db = firebase.firestore()
            await db.collection('personas').doc(id).update({
                ...persona
            })

        } catch (error) {
            console.log(error)
        }

        setPersona(objPersona);
        setModoEdicion(false)
        setError(null)

    }


    const cancelar = () => {

        setPersona(objPersona)
        setModoEdicion(false)
        setError(null)
    }

    return (
        <div className='container-xxl mt-5'>
            <h1 className='text-center'>REACT-FIREBASE</h1>
            <hr />
            <div className='row'>
                <div className="col-8">
                    <h4 className="text-center">Listado de personas - Total {lista.length}</h4>
                    {lista.length < 1 ?
                        <h2 className='mt-5 text-center'>Aun no hay personas listadas</h2>
                        :
                        <table className="table table-white">
                            <thead>
                                <tr>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Profesion</th>
                                    <th scope="col">Edad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lista.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.nombres}</td>
                                            <td>{item.apellidos}</td>
                                            <td>{item.profesion}</td>
                                            <td>{item.edad}</td>
                                            <td>
                                                <button className='btn btn-danger btn-sm float-end mx-2'
                                                    onClick={() => confirmarEliminar(item.id)}>Eliminar
                                                </button>
                                                <button className='btn btn-warning btn-sm float-end'
                                                    onClick={() => auxEditar(item)}>Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>
                <div className="col-4">
                    <h4 className="text-center" color='blue'>
                        {
                            modoEdicion ? 'Editar Persona' : 'Agregar persona'
                        }</h4>
                    <form onSubmit={modoEdicion ? editar : guardarDatos}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese nombres'
                            onChange={(e) => setPersona({ ...persona, nombres: e.target.value })}
                            value={persona.nombres}

                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese apellidos'
                            onChange={(e) => setPersona({ ...persona, apellidos: e.target.value })}
                            value={persona.apellidos}
                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese profesion'
                            onChange={(e) => setPersona({ ...persona, profesion: e.target.value })}
                            value={persona.profesion}
                        />
                        <input
                            className='form-control mb-2'
                            type="number"
                            min={0}
                            placeholder='Ingrese Edad'
                            onChange={(e) => setPersona({ ...persona, edad: e.target.value })}
                            value={persona.edad}
                        />
                        {
                            !modoEdicion ? (
                                <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                            )
                                :
                                (<>
                                    <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                                    <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                                </>
                                )
                        }

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Formulario;