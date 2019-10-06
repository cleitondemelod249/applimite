import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Eventos from './pages/Eventos';
import Index from './pages/Index';
import Assuntos from './pages/Assuntos';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Eventos,
        Index,
        Assuntos
    })
);


export default Routes;