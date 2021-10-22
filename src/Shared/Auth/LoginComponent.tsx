import React, {useState, useEffect, useRef} from 'react';
import {AuthApi} from './AuthApi';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { classNames } from 'primereact/utils';
import eventBus from '../../eventBus';

export interface ILoginErrors {
    name: boolean;
    password: boolean;
}

export function LoginComponent(props:any) {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const service = new AuthApi();
    const [errors, setErrors] = useState<ILoginErrors>({name:false, password:false});

    const showError = (str:string) => {
        eventBus.dispatch("error", str);
    }

    const isEmail = (login: string): boolean => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(login).toLowerCase());
    }

    const isBlank = (str?: string): boolean => {
        return (!str || /^\s*$/.test(str));
    }

    const validateForm = (login?:string, pass?:string):boolean => {
        const errs = {name:false, password:false};
        if (isBlank(login)) {
            errs.name = true;
        }
        if (isBlank(pass)) {
            errs.password = true;
        }
        if (errs.name || errs.password) {
            setErrors(errs);
            return false;
        }
        return true;
    }

    const getLoginErrorMessage = () => {
        return errors.name && <small className="p-error">Укажите логин или e-mail аккаунта</small>
    };

    const getPasswordErrorMessage = () => {
        return errors.password && <small className="p-error">Укажите пароль!</small>
    }

    const onSubmit = (e:any) => {
        e.preventDefault();
        if (validateForm(name, password)) {
            const isMail = isEmail(name);
            const credentials = {
                userName: isMail ? undefined : name,
                email: isMail ? name : undefined,
                password: password
            };

            service.login(credentials).then(() => {
                props.history.push("/weather");
                window.location.reload();
            }, (err) => {
                let backendError = (err.response && err.response.data && err.response.data.message) 
                    || err.message || err.toString();
                showError(backendError);
            });
        }
    };

    return (
            <div className="p-grid p-justify-center">
                <form onSubmit={onSubmit}>
                    <div className="card p-fluid" style={{minWidth:'490px'}}>
                        <div className="formgrid grid">
                            <div className="field col text-left pt-2">
                                <label htmlFor="nameId" className={classNames({ 'p-error': errors.name })}>Логин</label>
                                <InputText id="nameId" value={name} onChange={(e:any) => setName(e.target.value)} placeholder="Введите логин или email" 
                                            className={classNames({ 'p-invalid': errors.name })}/>
                                            {getLoginErrorMessage()}
                            </div>

                            <div className="field col text-left pt-2">
                                <label htmlFor="passId" className={classNames({ 'p-error': errors.password })}>Пароль</label>
                                <Password id="passId" value={password} onChange={(e:any) => setPassword(e.target.value)} toggleMask 
                                            className={classNames({ 'p-invalid': errors.password })} placeholder="Введите пароль"/>
                                            {getPasswordErrorMessage()}
                            </div>

                            <div className="field col text-right pt-2 pb-2">
                                <button type="submit" className="btn btn-primary">Войти</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        
        
    )

}