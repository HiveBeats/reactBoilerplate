import * as moment from 'moment'

export class DateService {
    private date:moment.Moment;
    private setDate:(date:moment.Moment) => void;
    
    constructor(date:moment.Moment, setDate:(date:moment.Moment) => void) {
        this.date = date;
        this.setDate = setDate;
    }

    
}