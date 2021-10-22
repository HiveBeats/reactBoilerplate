import moment from 'moment'
import React, {useEffect, useState} from 'react'
import useLoading from '../../../Shared/Hooks/useLoading'
import { EventService, IEventDto } from '../../api/EventService'
import useMomentPipe from '../useMomentPipe'
import './EventBookComponent.css'

type PropType = { date: moment.Moment }
export default function EventBookComponent(props:PropType) {
    const [doRefresh, isLoading] = useLoading(refresh);
    const eventService = new EventService();
    const [items, setItems] = useState<IEventDto[]>([]);
    const pipe = useMomentPipe();

    useEffect(() =>{
        doRefresh();
    }, [props.date]);

    function refresh(): Promise<any> {
        if (!props.date)
            return Promise.reject();
        
        return eventService.getItems(props.date).then(d => setItems(d)).catch(e => alert(e));
    }

    function deleteItem(item:IEventDto) {

    }

    const renderList = (items:IEventDto[]) => {
        return (
            items.map((i) => {
                return (
                    <React.Fragment>
                        <li className="task">
                            <span>
                                <strong>{i.title}</strong>
                            </span>
                            <button className="btn btn-danger" onClick={() => deleteItem(i)}>
                                <span className="pi pi-times-circle"></span>
                            </button>
                        </li>
                    </React.Fragment>
                    
                )
            })
        )
    }

    return (
        <React.Fragment>
            <section>
                <header>
                    Органайзер: <strong>{ pipe(props.date, 'DD.MM.YYYY') }</strong>
                    <hr />
                </header>

                <main>
                    <ul>
                        {renderList(items)}
                    </ul>
                </main>

                <footer>
                    {/* <form (ngSubmit)="submit()" [formGroup]="form">
                    <input type="text" formControlName="title">

                    <button
                        type="submit"
                        class="btn btn-primary btn-block"
                        [disabled]="form.invalid"
                    >Add</button>
                    </form> */}
                </footer>
            </section>
        </React.Fragment>
    )
}