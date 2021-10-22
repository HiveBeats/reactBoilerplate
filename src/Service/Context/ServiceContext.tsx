import * as React from 'react';
import { IService } from '../api/api';

export type SetCurrentItemFunction = (node:IService) => void;
export type EditItemFunction = (item:IService) => void;
export type ServiceContextType = {
    items: IService[] | undefined
    currentItem: IService | undefined 
    setCurrentItem: SetCurrentItemFunction | undefined
}

export const ServiceContext = React.createContext<ServiceContextType>({ items: [], currentItem: undefined, setCurrentItem: undefined});
