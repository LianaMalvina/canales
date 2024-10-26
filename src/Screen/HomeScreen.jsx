import React, { useEffect, useState } from 'react'; // Importamos React y hooks
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import { useWorkspaces } from '../hooks/useWorkspaces'; // Importamos el hook personalizado para gestionar workspaces

const HomeScreen = () => {
    // Creamos un estado para el nombre de usuario
    const [nombreUsuario, setNombreUsuario] = useState('pepe'); // Estado inicial con valor 'pepe'

    // Función para manejar cambios en el input del nombre de usuario
    const handleChangeInputName = (evento) => {
        setNombreUsuario(evento.target.value); // Actualiza el estado con el nuevo valor
    };

    // Desestructuramos valores y funciones del hook useWorkspaces
    const {
        workspaces, // Lista de workspaces
        workspace_name, // Nombre del nuevo workspace
        errorWorkspaceRepeated, // Indica si hay un nombre repetido
        handleChangeWorkspaceName, // Función para manejar cambios en el input del workspace
        handleSubmitWorkspace // Función para manejar el envío del formulario del workspace
    } = useWorkspaces();

    return (
        <>
            <h1>Afip</h1> {/* Título de la aplicación */}
            <h2>Bienvenido {nombreUsuario}</h2> {/* Mensaje de bienvenida con el nombre de usuario */}
            <form>
                <label htmlFor="nombre">Ingrese su nombre de usuario</label>
                {/* Campo de entrada para el nombre de usuario */}
                <input id='nombre' name='nombre' value={nombreUsuario} onChange={handleChangeInputName} />
            </form>

            <form onSubmit={handleSubmitWorkspace}> {/* Formulario para crear un nuevo workspace */}
                <h2>Crear espacio de trabajo</h2>
                <div>
                    <label htmlFor="workspace_name">Ingrese el nombre del espacio</label>
                    {/* Campo de entrada para el nombre del nuevo workspace */}
                    <input
                        placeholder='EJ: workspace 1' // Placeholder de ejemplo
                        id='workspace_name'
                        name='workspace_name'
                        value={workspace_name} // Estado del nombre del workspace
                        onChange={handleChangeWorkspaceName} // Manejo de cambios
                    />
                    {
                        errorWorkspaceRepeated // Verificamos si hay un error por nombre repetido
                            ? <span style={{ color: 'red' }}>Nombre en uso</span> // Mensaje de error
                            : (
                                workspace_name.length > 0 // Si el nombre tiene longitud mayor a 0
                                    ? <span style={{ color: 'green' }}>Nombre disponible</span> // Mensaje de éxito
                                    : null
                            )
                    }
                    {/* Botón para crear el workspace, deshabilitado si hay un error o si no hay nombre */}
                    <button type='submit' disabled={errorWorkspaceRepeated || workspace_name.length === 0}>Crear espacio</button>
                </div>

                <div>
                    {/* Mapeamos los workspaces existentes y creamos enlaces a ellos */}
                    {workspaces.map(workspace => {
                        return (
                            <Link key={workspace.id} to={`/workspace/${workspace.id}/0`}>
                                <h2>{workspace.name}</h2> {/* Nombre del workspace */}
                            </Link>
                        );
                    })}
                </div>
            </form>
        </>
    );
};

export default HomeScreen; // Exportamos el componente HomeScreen


/**xplicación del código
Importaciones: Se importan React y los hooks useEffect y useState para gestionar el estado. También se 
importa Link de react-router-dom para la navegación y el hook personalizado useWorkspaces.

Estado del componente:

nombreUsuario: Estado que almacena el nombre del usuario, inicializado en 'pepe'.
setNombreUsuario: Función para actualizar el estado del nombre de usuario.
Manejo de cambios:

handleChangeInputName: Función que se llama cada vez que el usuario escribe en el campo de entrada. 
Actualiza el estado nombreUsuario.
Uso del hook useWorkspaces: Se desestructuran las propiedades y funciones que proporciona el hook para
 trabajar con los workspaces.

Renderizado del componente:

Se muestra un título y un mensaje de bienvenida con el nombre del usuario.
Un formulario permite ingresar el nombre de usuario.
Otro formulario permite crear un nuevo workspace:
Incluye un campo de entrada para el nombre del workspace.
Muestra un mensaje de error si el nombre ya está en uso, o un mensaje de éxito si está disponible.
Un botón para crear el workspace, que está deshabilitado si hay un error o si no se ha ingresado ningún nombre.
Listar workspaces: Se mapean los workspaces existentes y se generan enlaces para navegar a cada uno,
 utilizando su ID en la URL.

Resumen
Este componente HomeScreen permite al usuario ingresar su nombre y crear nuevos espacios de trabajo,
 mostrando errores si el nombre ya está en uso. Además, lista los workspaces existentes y permite navegar 
 a ellos. Es una interfaz sencilla pero funcional para 
gestionar workspaces en una aplicación. */