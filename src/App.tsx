import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import eventBus from './eventBus';
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { Route, Switch, Redirect, useLocation, useHistory } from 'react-router-dom';
import Nav from './Nav';
import { WeatherForecastComponent } from './Weather/Components/WeatherForecastComponent';
import { LoginComponent } from './Shared/Auth/LoginComponent';
import { Toast } from 'primereact/toast';
import TokenService from './Shared/Auth/TokenService';
// .fill-height {
//   min-height: 100%;
//   height:auto !important; /* cross-browser */
//   height: 100%; /* cross-browser */
// }
function App() {
  const { pathname } = useLocation();
  const toast = useRef<Toast>(null);
  const history = useHistory();
  const showError = (str:string) => {
    if (null !== toast.current) {
        toast.current.show({severity:'error', summary: "ERROR", detail:str, life: 3000});
    }
}

  useEffect(() => {
    eventBus.on("error", (e:any) => {
      showError(e);
    });

    eventBus.on("movetologin", () => {
      TokenService.removeUser();
      history.push("/login");
      eventBus.dispatch("error", "Ошибка авторизации: пожалуйста, авторизуйтесь снова");
    });

    return () => {
      eventBus.remove("error");
      eventBus.remove("movetologin");
    };
  }, [])

  return (
    <div className="App h-100">
      <Toast ref={toast} />
      <Nav/>
      <div className="container-fluid py-4">
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route exact path="/" component={WeatherForecastComponent} />
            <Route path="/login" component={LoginComponent} />
            <Redirect from="*" to="/" />
        </Switch>
      </div>

    </div>
  );
}

export default App;
