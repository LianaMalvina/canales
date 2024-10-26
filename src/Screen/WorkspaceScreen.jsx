import React, { useEffect, useState } from 'react'; // Importamos React y hooks
import { Link, useNavigate, useParams } from 'react-router-dom'; // Importamos componentes y hooks de react-router-dom
import { useWorkspace } from '../hooks/useWorkspace'; // Importamos el hook personalizado useWorkspace

const WorkspaceScreen = () => {
    // Extraemos workspace_id y channel_id de los parámetros de la URL
    const { workspace_id, channel_id } = useParams();
    const navigate = useNavigate(); // Hook para la navegación programática

    /* 
    useEffect(() => {
        // Si no hay un channel_id, redirigimos al primer canal del workspace
        if (!channel_id) {
            navigate(`/workspace/${workspace_id}/${0}`);
        }
    }, []); 
    Esta sección está comentada, debería activarse si se desea redirigir al primer canal por defecto.
    */

    // Usamos el hook personalizado para obtener información del workspace
    const {
        workspace_seleccionado, 
        openNewChannelForm, 
        toggleNewChannelForm, 
        channel_seleccionado,
        crearChannel,
        crearMessage
    } = useWorkspace(workspace_id, channel_id); // Llamamos al hook pasando los IDs

    return (
        <div>
            <h1>{workspace_seleccionado.name}</h1> {/* Nombre del workspace seleccionado */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Listamos los canales del workspace */}
                {workspace_seleccionado.channel.map(channel => {
                    return (
                        <Link key={channel.id} to={`/workspace/${workspace_id}/${channel.id}`}>
                            {channel.name}
                        </Link>
                    );
                })}
            </div>
            {
                openNewChannelForm // Si el formulario para crear un nuevo canal está abierto
                    ? (
                        <form onSubmit={crearChannel}> {/* Asegurarse de que crearChannel maneje el envío */}
                            <div>
                                <label htmlFor='new_channel_name'>Nombre nuevo canal:</label>
                                <input name='new_channel_name' id='new_channel_name' />
                            </div>
                            <button type='submit'>Confirmar</button>
                            <button onClick={toggleNewChannelForm} type='button'>Cancelar</button>
                        </form>
                    )
                    : <button onClick={toggleNewChannelForm}>Crear canal</button> // Botón para abrir el formulario
            }

            <div>
                {
                    channel_seleccionado ? // Verificamos si hay un canal seleccionado
                        channel_seleccionado.messages.map(mensaje => { // Mapeamos los mensajes del canal
                            return (
                                <div key={mensaje.id}>
                                    <b>Fecha: {mensaje.date}</b> {/* Fecha del mensaje */}
                                    <p><b>{mensaje.user} dijo:</b> {mensaje.text}</p> {/* Mensaje y usuario */}
                                    <hr />
                                </div>
                            );
                        })
                        : <h2>No has seleccionado ningún canal</h2> // Mensaje si no hay canal seleccionado
                }
            </div>
        </div>
    );
}

export default WorkspaceScreen


/**xplicación del Código
Importaciones: Se importan React y hooks necesarios para el componente. También se importan
 componentes de react-router-dom para la navegación y el hook personalizado useWorkspace.

Parámetros y Navegación:

useParams: Se utiliza para obtener los parámetros workspace_id y channel_id de la URL.
useNavigate: Permite redirigir al usuario programáticamente.
Efecto de Redirección (comentado):

El useEffect está comentado, pero su intención es redirigir al primer canal del workspace si channel_id
 no está presente.
Hook Personalizado:

Se llama al hook useWorkspace, que retorna varias propiedades y funciones relacionadas con el workspace y
 sus canales.
Renderizado:

Se muestra el nombre del workspace.
Se listan los canales disponibles en el workspace, cada uno como un enlace.
Dependiendo del estado de openNewChannelForm, se muestra un formulario para crear un nuevo canal 
o un botón para abrir ese formulario.
Si hay un canal seleccionado, se muestran sus mensajes; de lo contrario, se muestra un mensaje
 indicando que no se ha seleccionado ningún canal.
Sugerencias y Correcciones
Efecto de Redirección:

Si se quiere implementar la redirección, el efecto debe incluir una lista de dependencias para 
ejecutarse correctamente, como [channel_id].
javascript
Copiar código
useEffect(() => {
    if (!channel_id) {
        navigate(`/workspace/${workspace_id}/${0}`);
    }
}, [channel_id, navigate]);
Manejo del Envío del Formulario:

El formulario para crear un nuevo canal debería tener una función para manejar el evento onSubmit. 
Asegúrate de que crearChannel esté correctamente implementada para manejar la lógica de creación.
javascript
Copiar código
<form onSubmit={(e) => { e.preventDefault(); crearChannel(); }}>
Control de Estado en el Formulario:

Para el input de nombre del nuevo canal, sería ideal manejar su estado para controlar su valor y hacer validaciones.
javascript
Copiar código
const [newChannelName, setNewChannelName] = useState('');
Y en el input:

javascript
Copiar código
<input
    name='new_channel_name'
    id='new_channel_name'
    value={newChannelName}
    onChange={(e) => setNewChannelName(e.target.value)}
/>
Accesibilidad:

Considera agregar atributos aria y manejar estados de carga o errores para mejorar la accesibilidad
 y la experiencia del usuario.
Con estas correcciones y mejoras, el componente debería funcionar de manera más robusta y proporcionar
 una mejor experiencia al usuario.



 */