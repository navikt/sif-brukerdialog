import { ArbeidstidUkeTabellItem } from '../ArbeidstidUkeTabellItem';

export interface ArbeidstidUkeTabellState {
    kanVelgeFlereUker: boolean;
    kanEndreEnkeltuke: boolean;
    korteUker: ArbeidstidUkeTabellItem[];
    ukerMedFerie: ArbeidstidUkeTabellItem[];
}
