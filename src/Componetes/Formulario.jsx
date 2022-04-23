import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { nanoid } from 'nanoid';

const Formulario = () => {

    const objPersona = {
        nombre: '',
        apellido: '',
        edad: '',
        sexo: '',
        telefono: '',
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

        if (!persona.nombre) {
            setError('Campo nombre vacío');
            return
        }

        if (!persona.apellido) {
            setError('Campo universidad vacío');
            return
        }

        if (!persona.edad) {
            setError('Campo edad vacío');
            return
        }

        if (!persona.sexo) {
            setError('Campo sexo vacío');
            return
        }

        if (!persona.telefono) {
            setError('Campo teléfono vacío');
            return
        }

        try {

            const db = firebase.firestore();
            const nuevaPersona = {
                ...persona,
            }

            await db.collection('persona').add(nuevaPersona);

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
}
export default Formulario;