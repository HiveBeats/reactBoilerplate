import * as React from 'react';
import './spinner.css';

export default function Spinner() {
    return (
        <div style={{display:'inline-block', verticalAlign:'middle', position:'relative'}}>
            <div className='tg-progress-spinner-loader' ></div>
        </div>
    )
}