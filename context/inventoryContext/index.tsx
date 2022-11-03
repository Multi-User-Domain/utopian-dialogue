import React, { createContext, ReactElement, useState, useEffect } from "react";

export interface IInventoryItem {
    name: string;
    quantity: number;
}

export interface IInventoryContext {
    inventory?: { [name: string]: IInventoryItem };
    addItem?: (item: IInventoryItem) => void;
    removeItem?: (name: string, quantity: number) => void;
    hasSufficientItem?: (name: string, minQuantity: number) => boolean;
};

export const InventoryContext = createContext<IInventoryContext>({});

export const InventoryProvider = ({
    children
}): ReactElement => {

    const [inventory, setInventory] = useState({});

    const addItem = (item: IInventoryItem) => {

    }

    const removeWholeItem = (name:string) => {
        
    }

    const removeItem = (name: string, quantity: number) => {

    };

    const hasSufficientItem = (name: string, minQuantity: number) => {
        return false;
    };

    return(
        <InventoryContext.Provider
            value={{
                inventory,
                addItem,
                removeItem,
                hasSufficientItem
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
};
