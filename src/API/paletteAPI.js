const baseURL = '/api/palettes';

const createPalette = async (palette) => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(palette),
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw new Error('Error creating palette');
};

// Add similar functions for read, update, and delete operations here

export const paletteAPI = {
    createPalette,
    // Export other functions here
};
