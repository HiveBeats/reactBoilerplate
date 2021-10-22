import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import React, {useContext, useState, useEffect} from 'react';
import Spinner from '../../../Shared/Components/Spinner/Spinner';
import useLoading from '../../../Shared/Hooks/useLoading';
import { IMessageType, IMessageTypeCreateDto, IService, ServiceApi } from '../../api/api'
import MessageTypeFormComponent from './MessageTypeFormComponent';
import { MessageTypesListComponent } from './MessageTypesListComponent';


type PropType = {currentItem:IService|undefined}
export default function MessageTypesPageComponent(props:PropType) {
    const [types, setTypes] = useState<IMessageType[]>();
    const [current, setCurrent] = useState<IMessageType>();
    const [doRefresh, isLoading] = useLoading(refresh);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const apiService = new ServiceApi();

    useEffect(() => {
        doRefresh();
    }, [props]);

    function refresh(): Promise<any> {
        if (!props.currentItem)
            return Promise.reject();

        setCurrent(undefined);
        return apiService.getMessageTypes(props.currentItem?.key||'').then(data => {
            setTypes(data);
        })
        .catch(e => console.log(e));
    }

    function showAdding() {
        setIsAdding(true);
    }

    const confirmDelete = () => {
        confirmDialog({
            message: `Вы, действительно, хотите удалить ${current?.name}?`,
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            accept: () => onDeletingAction(),
            reject: () => {}
        });
    }

    function onDeletingAction() {
        if (!current || !props.currentItem)
            return;

        const deleteDto = {
            service: props.currentItem?.key,
            name: current.name
        }
        apiService.deleteMessageType(deleteDto).then(d => {
            doRefresh();
        })
        .catch((e) => {
            alert(e);
        });
    }

    function onAddingFormAction(item: IMessageTypeCreateDto) {
        apiService.createMessageType(item).then(d => {
            setIsAdding(false);
            doRefresh();
        })
        .catch((e) => {
            alert(e);
        });
    }

    const renderItems = (items:IMessageType[]|undefined, isLoading:boolean, setCurrent:(item:IMessageType)=> void) => {
        if (isLoading && props.currentItem) {
            return (
                <React.Fragment>
                    <Spinner/>
                </React.Fragment>
            )
        }
        else return (
            <React.Fragment>
                <MessageTypesListComponent items={items} current={current} setCurrent={setCurrent}/>
            </React.Fragment>
        )
    }

    const toolbarContent = () => {
        return (
            <React.Fragment>
                <Button icon="pi pi-plus" className="p-mr-2" onClick={showAdding} disabled={!props.currentItem}/>
                <Button icon="pi pi-times-circle" className="p-mr-2 p-button-danger" onClick={confirmDelete} disabled={!current}/>
                <Button icon="pi pi-refresh" className="p-mr-2 p-button-success" onClick={doRefresh}/>
            </React.Fragment>
        )
    }

    const toolbarTitle = () => {
        return (
            <React.Fragment>
                <h5>Типы сообщений</h5>
            </React.Fragment>
        )
    }
    
    return (
        <React.Fragment>
            <Dialog header="Добавить тип сообщений" visible={isAdding} style={{ width: '50vw' }} onHide={() => setIsAdding(false)}>
                <MessageTypeFormComponent serviceId={props.currentItem?.key} onResult={onAddingFormAction}/>
            </Dialog>
            <div className="col-12">
                <div className="row">
                    <Toolbar left={toolbarTitle} right={toolbarContent} style={{minWidth:'100%'}}/>
                </div>
                <div className="row">
                    {renderItems(types, isLoading, setCurrent)}
                </div>
            </div>
        </React.Fragment>
            
    )
}