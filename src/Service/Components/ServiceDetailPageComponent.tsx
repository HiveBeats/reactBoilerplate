import * as React from 'react';
import { ServiceContext } from '../Context/ServiceContext';
import MessageTypesPageComponent from './MessageTypes/MessageTypesPageComponent';

export default function ServiceDetailPageComponent() {

    return (
        <ServiceContext.Consumer>
            {({currentItem}) => (
                <MessageTypesPageComponent currentItem={currentItem}/>
            )}
        </ServiceContext.Consumer>
    )
}