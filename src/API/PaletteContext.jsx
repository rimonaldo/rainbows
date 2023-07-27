import React, { createContext, useState } from 'react';
import { paletteAPI } from './paletteAPI';

export const PaletteContext = createContext();

export const PaletteProvider = ({ children }) => {
    const [palettes, setPalettes] = useState([]);

    const createPalette = async (palette) => {
        try {
            const newPalette = await paletteAPI.createPalette(palette);
            setPalettes([...palettes, newPalette]);
        } catch (error) {
            console.error(error);
            // Handle the error as you see fit
        }
    };

    // Use similar logic for read, update, and delete operations

    return (
        <PaletteContext.Provider value={{ palettes, createPalette }}>
            {children}
        </PaletteContext.Provider>
    );
};
