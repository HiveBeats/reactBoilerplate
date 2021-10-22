import React, {useState, useEffect} from 'react';
import { IService, IServiceCreateDto, ServiceApi } from '../api/api';
import { ServiceContext } from '../Context/ServiceContext';
import { ServiceTreeComponent } from './ServiceTreeComponent';
import Spinner from '../../Shared/Components/Spinner/Spinner';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { confirmDialog } from 'primereact/confirmdialog';
import ServiceDetailPageComponent from './ServiceDetailPageComponent';
import ServiceFormComponent from './ServiceFormComponent';
import useLoading from '../../Shared/Hooks/useLoading';

type RefreshType = ()=>void;
export function ServicePageComponent() {
    const [items, setItems] = useState<IService[]>();
    const [currentItem, setCurrentItem] = useState<IService>();
    const [doRefresh, isLoading] = useLoading(refresh);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const service = new ServiceApi();
    
    useEffect(() => {
        doRefresh();
    }, []);

    function refresh(): Promise<any> {
        return service.getItems()
            .then(d => {
                setItems(d)
            })
            .catch(d => console.log('ERROR'));
    }

    function setCurrent(item: IService) {
        if (!items) { 
            return;
        }
        setCurrentItem(item);
    }

    function showAdding() {
        setIsAdding(true);
    }

    const confirmDelete = () => {
        confirmDialog({
            message: `Вы, действительно, хотите удалить ${currentItem?.label}?`,
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            accept: () => onDeletingAction(),
            reject: () => {}
        });
    }

    function onAddingFormAction(item: IServiceCreateDto) {
        service.insertService(item).then(d => {
            setIsAdding(false);
            doRefresh();
        })
        .catch((e) => {
            alert(e);
        });
    }

    function onDeletingAction() {
        if (!currentItem)
            return;

        service.deleteService(currentItem?.key).then(d => {
            doRefresh();
        })
        .catch((e) => {
            alert(e);
        });
    }

    const toolbarContent = () => {
        return (
            <React.Fragment>
                <Button icon="pi pi-plus" className="p-mr-2" onClick={showAdding}/>
                <Button icon="pi pi-times-circle" className="p-mr-2 p-button-danger" onClick={confirmDelete} disabled={!currentItem}/>
                <Button icon="pi pi-refresh" className="p-mr-2 p-button-success" onClick={doRefresh}/>
            </React.Fragment>
        )
    }

    const toolbarTitle = () => {
        return (
            <React.Fragment>
                <h5>Сервисы</h5>
            </React.Fragment>
        )
    }

    const renderItems = (items:IService[]|undefined, isLoading:boolean) => {
        if (isLoading) {
            return (
                <React.Fragment>
                    <Spinner/>
                </React.Fragment>
            )
        }
        else return (
            <React.Fragment>
                <Dialog header="Добавить сервис" visible={isAdding} style={{ width: '50vw' }} onHide={() => setIsAdding(false)}>
                    <ServiceFormComponent services={items} onResult={onAddingFormAction}/>
                </Dialog>
                <div className="col-12 pb-4" style={{width:'100%'}}>
                    <div className="row">
                        <Toolbar left={toolbarTitle} right={toolbarContent}  style={{minWidth:'100%'}}/>
                    </div>
                    <div className="row">
                        <ServiceTreeComponent/>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    

    return (
        <ServiceContext.Provider value={{items: items, currentItem: currentItem, setCurrentItem:setCurrent}}>
            <div className="d-flex align-content-stretch flex-wrap">
                <div className="col-md-6 col-sm-12">
                    {renderItems(items, isLoading)}
                </div>
                <div className="col-md-6 col-sm-12">
                    <ServiceDetailPageComponent/>
                </div>
            </div>
        </ServiceContext.Provider>
    )
}