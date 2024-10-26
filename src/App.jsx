import React, { useEffect, useState } from 'react'; // Importamos React y hooks (aunque en este caso no se usan)
import { Link, Route, Routes } from 'react-router-dom'; // Importamos componentes para la navegación
import HomeScreen from './Screen/HomeScreen'; // Importamos el componente HomeScreen
import WorkspaceScreen from './Screen/WorkspaceScreen'; // Importamos el componente WorkspaceScreen

// Definimos el componente principal App
function App() {
  return (
    <>
      {/* Definimos las rutas de la aplicación */}
      <Routes>
        <Route path='/' element={<HomeScreen />} /> {/* Ruta principal que renderiza HomeScreen */}
        {/* Ruta para acceder a un workspace específico utilizando un ID */}
        <Route path='/workspace/:workspace_id/' element={<WorkspaceScreen />} />
        {/* Ruta para acceder a un canal específico dentro de un workspace */}
        <Route path='/workspace/:workspace_id/:channel_id' element={<WorkspaceScreen />} />
      </Routes>
    </>
  );
}

export default App; // Exportamos el componente App


/**xplicación del Código
Importaciones:

Se importan React y sus hooks (useEffect y useState), aunque en este caso no se utilizan en este componente.
Se importan Link, Route, y Routes de react-router-dom para manejar la navegación entre diferentes componentes.
Se importan los componentes HomeScreen y WorkspaceScreen que se mostrarán en las rutas definidas.
Componente App:

Este es el componente principal de la aplicación. Dentro de este componente, se definen las rutas que corresponden a 
las diferentes pantallas de la aplicación.
Renderizado de Rutas:

<Routes>: Este componente envuelve todas las rutas y permite definir diferentes caminos para navegar.
<Route>: Define una ruta específica que se corresponde con un camino dado:
path='/': Esta es la ruta raíz que renderiza el componente HomeScreen.
path='/workspace/:workspace_id/': Esta ruta incluye un parámetro dinámico workspace_id, que representa el ID 
del workspace y renderiza WorkspaceScreen.
path='/workspace/:workspace_id/:channel_id': Esta ruta incluye dos parámetros dinámicos (workspace_id y channel_id),
 permitiendo la navegación a un canal específico dentro del workspace.
Fragmentos:

Se utiliza <>...</> para encapsular los elementos que se retornan, que es un fragmento de React que permite 
agrupar múltiples elementos sin agregar un nodo extra al DOM.
Exportación:

Se exporta el componente App para que pueda ser utilizado en otros lugares de la aplicación, como el archivo 
principal donde se renderiza la aplicación.
Comentarios Adicionales
Estructura de Rutas: La estructura de rutas permite que al navegar a /workspace/:workspace_id/ se acceda
 a la pantalla del workspace correspondiente, y al añadir un canal con /workspace/:workspace_id/:channel_id, se accede a un canal específico dentro de ese workspace.

Uso de Hooks: Aunque useEffect y useState están importados, no se utilizan en este componente. Si no
 se necesitan, se pueden eliminar para mantener el código limpio.

Potenciales Mejoras:

Podrías agregar un componente de manejo de errores o una ruta para mostrar una página 404 si la ruta no 
coincide con ninguna de las definidas.
Considera manejar el estado global de la aplicación con un contexto si se necesita compartir datos entre 
diferentes componentes.
Con esta estructura, el componente App proporciona una base sencilla pero efectiva para una aplicación React
 que utiliza enrutamiento. */
