// import React from 'react';
// import './App.css';
// import PokedexNavigation from './assets/components/PokedexNavigation';
// import router from './assets/config/router';

// function App() {
//   return (
//     <div className="app">
//       <PokedexNavigation />
//     </div>
//   );
// }

// export default App;


import PokedexNavigation from './assets/components/PokedexNavigation';
import './App.css';
import { RouterProvider } from 'react-router'
import router from './assets/config/router';

const App = () => {
  return (
   <RouterProvider router={router} />
  )
}

export default App
