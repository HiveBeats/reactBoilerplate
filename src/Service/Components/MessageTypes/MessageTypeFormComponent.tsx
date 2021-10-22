import { InputText } from "primereact/inputtext";
import React, {useState} from "react";
import { IMessageTypeCreateDto } from "../../api/api";
import {Checkbox} from 'primereact/checkbox';

type PropType= {
    serviceId:string|undefined;
    onResult:(item:IMessageTypeCreateDto) => void
}
export default function MessageTypeFormComponent(props:PropType) {
    const [name, setName] = useState<string>();
    const [solve, setSolve] = useState<boolean>(false);

    const onSubmit = (e:any) => {
        e.preventDefault();
        if (!props.serviceId)
            return;

        const addingItem = {
            name:name||'',
            serviceId:props.serviceId,
            solveByReading:solve
        };

        props.onResult(addingItem);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="nameId" className="mr-2">Название</label>
                <InputText id="nameId" value={name} onChange={(e:any) => setName(e.target.value)} placeholder="Название" 
                            style={{width:'100%'}}/>
            </div>
            <div className="form-group">
                <Checkbox id="solveId" onChange={e => setSolve(e.checked)} checked={solve}></Checkbox>
                <label htmlFor="solveId" className="ml-2 mb-0">Закрывать по прочтению</label>
            </div>
            
            <div className="text-right">
                <button type="submit" className="btn btn-primary">Добавить</button>
            </div>
        </form>
    )
}