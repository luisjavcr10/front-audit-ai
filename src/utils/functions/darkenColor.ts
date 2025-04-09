// @ts-expect-error: chroma typing issues (adjust as needed)
import chroma from 'chroma-js';

export const darkenColor = (hex: string, percent: number): string => { 
    return chroma(hex).darken(percent / 100).hex();
};