import moment from 'moment'
import * as React from 'react'
import { DateService } from '../../api/DateService'
import useMomentPipe from '../useMomentPipe'

const styles = {
    p: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    p_span: {
        margin: "0 2rem",
        // textAlign: "center",
        width: "200px"
    },
    p_i: {
        cursor: "pointer"
    }
}

type PropType = { changeMonth:(dir:number) => void, date:moment.Moment }
export default function DateSelectorComponent(props:PropType) {
    const pipe = useMomentPipe();
    
    function go(dir: number) {
        props.changeMonth(dir)
    }

    return (
        <React.Fragment>
            <p style={styles.p}>
                <i style={styles.p_i} className="pi pi-angle-double-left mx-2" onClick={() => go(-1)}></i>
                <span style={styles.p_span}>{ pipe(props.date) }</span>
                <i style={styles.p_i} className="pi pi-angle-double-right mx-2" onClick={() => go(1)}></i>
            </p>
        </React.Fragment>
    )
}
