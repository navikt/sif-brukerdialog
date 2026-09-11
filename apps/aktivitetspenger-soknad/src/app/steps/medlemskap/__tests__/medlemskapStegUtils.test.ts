import { MedlemskapSøknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';
import { ArbeidUtland } from '@sif/soknad-forms';
import { ISODate } from '@sif/utils';

import { toMedlemskapStegFormValues, toMedlemskapStegSøknadsdata } from '../medlemskapStegUtils';
import { MedlemskapFormValues } from '../types';

const arbeidUtland: ArbeidUtland = {
    id: '1',
    landkode: 'SE',
    landnavn: 'Sverige',
    periode: { from: '2020-01-01' as ISODate, to: '2020-06-01' as ISODate },
    jobbetIPerioden: true,
    utenlandskNasjonalId: undefined,
};

describe('toMedlemskapStegFormValues', () => {
    it('skal returnere tomt objekt når søknadsdata mangler', () => {
        expect(toMedlemskapStegFormValues(undefined)).toEqual({});
    });

    it('skal returnere tomt objekt når harBoddINorge ikke er besvart', () => {
        expect(toMedlemskapStegFormValues({} as MedlemskapSøknadsdata)).toEqual({});
    });

    it('skal mappe lagret søknadsdata tilbake til skjemaverdier', () => {
        const søknadsdata: MedlemskapSøknadsdata = {
            harBoddINorge: false,
            harJobbetINorge: true,
            harJobbetUtenforNorge: true,
            bostederUtenforNorge: undefined,
            arbeidsstederUtenforNorge: [arbeidUtland],
        };

        expect(toMedlemskapStegFormValues(søknadsdata)).toEqual({
            harBoddINorge: YesOrNo.NO,
            harJobbetINorge: YesOrNo.YES,
            harJobbetUtenforNorge: YesOrNo.YES,
            bostederUtenforNorge: undefined,
            arbeidsstederUtenforNorge: [arbeidUtland],
        });
    });
});

describe('toMedlemskapStegSøknadsdata', () => {
    it('skal lagre kun harBoddINorge når søkeren har bodd i Norge og ikke har jobbet i utlandet', () => {
        const formValues: MedlemskapFormValues = {
            harBoddINorge: YesOrNo.YES,
            harJobbetUtenforNorge: YesOrNo.NO,
        };

        expect(toMedlemskapStegSøknadsdata(formValues)).toEqual({
            harBoddINorge: true,
            harJobbetINorge: undefined,
            harJobbetUtenforNorge: false,
            bostederUtenforNorge: undefined,
            arbeidsstederUtenforNorge: undefined,
        });
    });

    it('skal lagre arbeidssteder i utlandet når søkeren har jobbet i utlandet', () => {
        const formValues: MedlemskapFormValues = {
            harBoddINorge: YesOrNo.YES,
            harJobbetUtenforNorge: YesOrNo.YES,
            arbeidsstederUtenforNorge: [arbeidUtland],
        };

        expect(toMedlemskapStegSøknadsdata(formValues).arbeidsstederUtenforNorge).toEqual([arbeidUtland]);
    });

    it('skal forkaste svar og data fra spørsmål som ikke lenger er synlige', () => {
        // Søkeren har svart NO->fylt ut arbeidssteder->fylt ut bosteder, men har deretter
        // endret harBoddINorge slik at disse svarene ikke lenger er relevante og skal droppes.
        const formValues: MedlemskapFormValues = {
            harBoddINorge: YesOrNo.YES,
            harJobbetINorge: YesOrNo.YES,
            harJobbetUtenforNorge: YesOrNo.NO,
            bostederUtenforNorge: [arbeidUtland],
            arbeidsstederUtenforNorge: [arbeidUtland],
        };

        const result = toMedlemskapStegSøknadsdata(formValues);

        expect(result.harJobbetINorge).toBeUndefined();
        expect(result.bostederUtenforNorge).toBeUndefined();
        expect(result.arbeidsstederUtenforNorge).toBeUndefined();
    });

    it('skal lagre harBoddINorge=false når spørsmålet ikke er besvart', () => {
        expect(toMedlemskapStegSøknadsdata({}).harBoddINorge).toBe(false);
    });
});
