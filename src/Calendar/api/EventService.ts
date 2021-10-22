import { AxiosResponse } from 'axios';
import apiBase from '../../apiBase';

export interface IEventDto {        
    id: string,
    title: string,
    desc: string,
    eventStart: Date,
    eventLength: Date //????????????????????
}

export interface CreateEventRequest {
    title:           string;
    desc:            string;
    eventStart:      Date;
    eventLength:     Date;
    eventInterval:   string;
    actionServiceId: string;
    actionName:      string;
    messagePayload:  string;
}

export class EventService {
    getItems(date:moment.Moment): Promise<IEventDto[]> {
        const dateFormat = date.format('YYYY-MM-DD');
        return apiBase.get<IEventDto[]>(`Event/${dateFormat}`).then(d => d.data);
    }

    create(item: CreateEventRequest): Promise<AxiosResponse<any>> {
        return apiBase.post('Event', item);
    }
}