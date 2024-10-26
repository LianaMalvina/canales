import { useEffect, useState } from "react"; // Importamos los hooks de React
import { v4 as uuidv4 } from 'uuid'; // Importamos la función para generar IDs únicos

// Definimos el hook personalizado useWorkspaces
export const useWorkspaces = () => {
    // Datos iniciales de los workspaces
    const workspaces_intial_data = [
        { name: 'Workspace UTN', id: 0 },
        { name: 'Clases de Next.js', id: 1 },
        { name: 'Clases de piano', id: 2 },
        { name: 'Juegos', id: 3 }
    ];
    
    // Intentamos recuperar los workspaces del localStorage
    const storaged_workspaces = JSON.parse(localStorage.getItem('workspaces'));
    // Usamos los workspaces almacenados o los datos iniciales si no hay nada guardado
    const workspace_initial_state = storaged_workspaces || workspaces_intial_data;

    // Definimos el estado para workspaces, el nombre del nuevo workspace y el error de nombre repetido
    const [workspaces, setWorkspaces] = useState(workspace_initial_state);
    const [workspace_name, set_workspace_name] = useState('');
    const [errorWorkspaceRepeated, setErrorWorkspaceRepeated] = useState(false);

    // Función para manejar cambios en el campo de entrada del nombre del workspace
    const handleChangeWorkspaceName = (evento) => {
        set_workspace_name(evento.target.value);
    };

    // Función para verificar si el nombre del workspace ya está en uso
    const isInUseWorkspaceName = (workspace_name, workspaces) => {
        return workspaces.some(workspace => workspace.name === workspace_name);
    };

    // Función para crear un nuevo workspace
    const createWorkspace = (workspace_name) => {
        const new_workspace = {
            name: workspace_name,
            channel: [
                {
                    name: 'General',
                    id: uuidv4(), // ID único para el canal
                    messages: [], // Mensajes iniciales vacíos
                }
            ],
            id: uuidv4() // ID único para el workspace
        };
        // Actualizamos el estado de workspaces con el nuevo workspace
        setWorkspaces((prevWorkspaces) => [...prevWorkspaces, new_workspace]);
    };

    // Función que maneja el envío del formulario
    const handleSubmitWorkspace = (evento) => {
        evento.preventDefault(); // Evita el comportamiento predeterminado del formulario
        createWorkspace(workspace_name); // Crea el nuevo workspace
    };

    // Efecto para verificar si el nombre del workspace ya existe
    useEffect(() => {
        setErrorWorkspaceRepeated(isInUseWorkspaceName(workspace_name, workspaces));
    }, [workspace_name]); // Se ejecuta cada vez que cambia el nombre del workspace

    // Efecto para guardar los workspaces en el localStorage
    useEffect(() => {
        localStorage.setItem('workspaces', JSON.stringify(workspaces));
    }, [workspaces]); // Se ejecuta cada vez que cambian los workspaces

    // Retornamos el estado y las funciones para usarlas en el componente
    return {
        workspaces,
        workspace_name,
        errorWorkspaceRepeated,
        handleChangeWorkspaceName,
        handleSubmitWorkspace
    };
};
