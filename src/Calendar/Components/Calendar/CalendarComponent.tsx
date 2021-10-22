import moment from 'moment'
import React, {useEffect, useState} from 'react'
import { DateService } from '../../api/DateService';
import useMomentPipe from '../useMomentPipe';
import './CalendarComponent.css'

interface Day {
    value: moment.Moment
    active: boolean
    disabled: boolean
    selected: boolean
}
  
interface Week {
    days: Day[]
}

type PropType = { changeDate:(day:moment.Moment) => void, date: moment.Moment }
export default function CalendarComponent(props:PropType) {
    const [calendar, setCalendar] = useState<Week[]>([]);
    const pipe = useMomentPipe();

    useEffect(() => {
        generate(props.date);
    }, [props.date]);

    function generate(now: moment.Moment) {
        const startDay = now.clone().startOf('month').startOf('isoWeek')
        const endDay = now.clone().endOf('month').endOf('isoWeek')
    
        const date = startDay.clone().subtract(1, 'day')
    
        const clndr = []
    
        while (date.isBefore(endDay, 'day')) {
          clndr.push({
            days: Array(7)
              .fill(0)
              .map(() => {
                const value = date.add(1, 'day').clone()
                const active = moment().isSame(value, 'date')
                const disabled = !now.isSame(value, 'month')
                const selected = now.isSame(value, 'date')
    
                return {
                  value, active, disabled, selected
                }
              })
          })
        }
    
        setCalendar(clndr);
    }

    function select(day: moment.Moment) {
        props.changeDate(day);
    }

    const isSelectedDay = (d: Day) => d.selected ? "selected" : "";
    const isActiveDay = (d: Day) => d.active ? "active" : "";

    const renderTableBody = (clndr:Week[]) => {
        return (
            <React.Fragment>
                {clndr.map((w) => {
                    return (
                    <tr>
                        {w.days.map((d) => {
                            return (
                            <td className={d.disabled ? 'disabled' : ''}
                                onClick={() => select(d.value)}>
                                <span className={`${isSelectedDay(d)} ${isActiveDay(d)}`}>
                                { pipe(d.value, 'ddd DD') }
                                </span>
                            </td>
                            )
                        })}
                    </tr>
                    )
                })}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>Пн</th>
                        <th>Вт</th>
                        <th>Ср</th>
                        <th>Чт</th>
                        <th>Пт</th>
                        <th>Сб</th>
                        <th>Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody(calendar)}
                </tbody>
            </table>
        </React.Fragment>
    )
}