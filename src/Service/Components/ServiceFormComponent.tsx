import React, { useState} from "react";
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from 'primereact/treeselect';
import { IService, IServiceCreateDto } from "../api/api";

type PropType = {
    services:IService[]|undefined;
    onResult:(item:IServiceCreateDto) => void
}
export default function ServiceFormComponent(props:PropType) {
    const [name, setName] = useState<string>();
    const [parent, setParent] = useState<any>({});

    const onSubmit = (e:any) => {
        e.preventDefault();
        const addingService = {
            name:name||'',
            parentId:parent
        };
        props.onResult(addingService);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="parentd" className="mr-2">Родитель</label>
                <TreeSelect id="parentId" value={parent} options={props.services} onChange={(e) => setParent(e.value)} placeholder="Родитель"
                            style={{width:'100%'}}></TreeSelect>
            </div>
            <div className="form-group">
                <label htmlFor="nameId" className="mr-2">Название</label>
                <InputText id="nameId" value={name} onChange={(e:any) => setName(e.target.value)} placeholder="Название" 
                            style={{width:'100%'}}/>
            </div>
            
            <div className="text-right">
                <button type="submit" className="btn btn-primary">Добавить</button>
            </div>
        </form>
    )
}