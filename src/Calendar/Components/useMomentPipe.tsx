import moment from 'moment'
import 'moment/locale/ru'  // without this line it didn't work
import * as React from 'react'

type pipeFunction = (date: moment.Moment, format?:string) => string
export default function useMomentPipe(): pipeFunction {
    const pipeFunction = (date: moment.Moment, format?:string) => {
        return date.locale('ru').format(format||'MMMM YYYY');
    }
    return pipeFunction;
}