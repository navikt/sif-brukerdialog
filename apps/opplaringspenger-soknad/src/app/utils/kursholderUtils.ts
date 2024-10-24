import { Kursholder } from '../types/Kursholder';

export const getKursholderFromId = (id: string, kursholdere: Kursholder[]): Kursholder | undefined => {
    return kursholdere.filter((k) => k.id === id)[0];
};
