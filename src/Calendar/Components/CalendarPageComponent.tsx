import moment from 'moment'
import React, {useState} from 'react'
import { DateService } from '../api/DateService';
import CalendarComponent from './Calendar/CalendarComponent';
import EventBookComponent from './EventBook/EventBookComponent';
import DateSelectorComponent from './Selector/DateSelectorComponent';


export default function CalendarPageComponent() {
    const [date, setDate] = useState<moment.Moment>(moment());

    function changeMonth(dir: number) {
        const value = date.clone().add(dir, 'month')
        setDate(value);
    }
    
    function changeDate(date: moment.Moment) {
      const value = date.set({
        date: date.date(),
        month: date.month()
      })
      setDate(value);
    }

    return (
        <div className="d-flex flex-column">
            <DateSelectorComponent changeMonth={changeMonth} date={date}/>
            <CalendarComponent changeDate={changeDate} date={date}/>
            <EventBookComponent date={date} />
        </div>
    )
}