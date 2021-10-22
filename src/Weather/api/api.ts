import { AxiosResponse } from 'axios';
import apiBase from '../../apiBase';

export interface IWeatherForecast {
    date: Date;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export class WeatherApi {
    getItems(): Promise<IWeatherForecast[]> {
        return apiBase.get<IWeatherForecast[]>('WeatherForecast/').then(d => d.data);
    }
}