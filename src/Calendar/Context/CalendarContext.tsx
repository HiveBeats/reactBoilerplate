import * as React from 'react';

export const ServiceContext = React.createContext<any>({ items: [], currentItem: undefined, setCurrentItem: undefined});
