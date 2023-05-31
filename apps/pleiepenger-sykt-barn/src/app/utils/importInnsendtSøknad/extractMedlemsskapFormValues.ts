import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { BostedUtland } from '@navikt/sif-common-forms-ds/lib';
import { dateRangesCollide, dateToday, guid, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { SøknadsimportEndring, SøknadsimportEndringstype } from '../../types/ImportertSøknad';
import { BostedUtlandApiData, MedlemskapApiData } from '../../types/søknad-api-data/SøknadApiData';
import { SøknadFormField, SøknadFormValues } from '../../types/SøknadFormValues';
import { booleanToYesOrNo } from '../booleanToYesOrNo';
import { getMedlemsskapDateRanges } from '../medlemsskapUtils';

type MedlesskapFormValues = Pick<
    SøknadFormValues,
    | SøknadFormField.harBoddUtenforNorgeSiste12Mnd
    | SøknadFormField.skalBoUtenforNorgeNeste12Mnd
    | SøknadFormField.utenlandsoppholdSiste12Mnd
    | SøknadFormField.utenlandsoppholdNeste12Mnd
>;

export const mapBostedUtlandApiDataToBostedUtland = (bostedUtland: BostedUtlandApiData): BostedUtland => {
    return {
        id: guid(),
        fom: ISODateToDate(bostedUtland.fraOgMed),
        tom: ISODateToDate(bostedUtland.tilOgMed),
        landkode: bostedUtland.landkode,
    };
};

export const refordelUtenlandsoppholdUtFraNyDagensDato = (
    bostedUtland: BostedUtland[],
    søknadsdato: Date
): {
    endringer: SøknadsimportEndring[];
    bostedSiste12Måneder: BostedUtland[];
    bostedNeste12Måneder: BostedUtland[];
} => {
    const { neste12Måneder, siste12Måneder } = getMedlemsskapDateRanges(søknadsdato);
    const bostedSiste12Måneder: BostedUtland[] = [];
    const bostedNeste12Måneder: BostedUtland[] = [];
    const endringer: SøknadsimportEndring[] = [];
    bostedUtland.forEach((bosted) => {
        const periode: DateRange = {
            from: bosted.fom,
            to: bosted.tom,
        };
        const erInnenforSiste12 = dateRangesCollide([periode, siste12Måneder]);
        const erInnenforNeste12 = dateRangesCollide([periode, neste12Måneder]);
        if (erInnenforNeste12 && erInnenforSiste12) {
            bostedSiste12Måneder.push({ ...bosted, id: guid(), tom: siste12Måneder.to });
            bostedNeste12Måneder.push({ ...bosted, id: guid(), fom: neste12Måneder.from });
            endringer.push({ type: SøknadsimportEndringstype.endretBostedUtland });
        } else if (erInnenforSiste12) {
            bostedSiste12Måneder.push(bosted);
        } else if (erInnenforNeste12) {
            bostedNeste12Måneder.push(bosted);
        }
    });
    return {
        endringer,
        bostedNeste12Måneder,
        bostedSiste12Måneder,
    };
};

export const extractMedlemsskapFormValues = ({
    harBoddIUtlandetSiste12Mnd,
    skalBoIUtlandetNeste12Mnd,
    utenlandsoppholdNeste12Mnd,
    utenlandsoppholdSiste12Mnd,
}: MedlemskapApiData): { formValues: MedlesskapFormValues; endringer: SøknadsimportEndring[] } => {
    const { bostedNeste12Måneder, bostedSiste12Måneder, endringer } = refordelUtenlandsoppholdUtFraNyDagensDato(
        [
            ...utenlandsoppholdSiste12Mnd.map(mapBostedUtlandApiDataToBostedUtland),
            ...utenlandsoppholdNeste12Mnd.map(mapBostedUtlandApiDataToBostedUtland),
        ],
        dateToday
    );
    return {
        endringer,
        formValues: {
            harBoddUtenforNorgeSiste12Mnd: booleanToYesOrNo(harBoddIUtlandetSiste12Mnd),
            utenlandsoppholdSiste12Mnd: bostedSiste12Måneder,
            skalBoUtenforNorgeNeste12Mnd: booleanToYesOrNo(skalBoIUtlandetNeste12Mnd),
            utenlandsoppholdNeste12Mnd: bostedNeste12Måneder,
        },
    };
};
