import React, {useState, useEffect} from 'react';
import { IWeatherForecast, WeatherApi } from '../api/api';
import useLoading from '../../Shared/Hooks/useLoading';

export function WeatherForecastComponent() {
    const [items, setItems] = useState<IWeatherForecast[]>([]);
    const [doRefresh, isLoading] = useLoading(refresh);
    const service = new WeatherApi();

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
    return (
        <ul>
            { items.map((item) => {
                return <div >
                    {item.temperatureC} - {item.summary}
                </div>
            })}
        </ul>
    )
}