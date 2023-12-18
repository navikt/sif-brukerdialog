import { DateRange } from '@navikt/sif-common-utils';
import { SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { ArbeidssituasjonSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { extractArbeidssituasjonAnsattSøknadsdata } from './extractArbeidssituasjonAnsattSøknadsdata';
import { extractArbeidssituasjonFrilansSøknadsdata } from './extractArbeidssituasjonFrilansSøknadsdata';
import { extractArbeidssituasjonSelvstendigSøknadsdata } from './extractArbeidssituasjonSelvstendigSøknadsdata';
import { extractOpptjeningUtlandSøknadsdata } from './extractOpptjeningUtlandSøknadsdata';
import { extractUtenlandskNæringSøknadsdata } from './extractUtenlandskNæringSøknadsdata';

export const extractArbeidssituasjonSøknadsdata = (
    søknadsperiode: DateRange,
    formValues: SøknadFormValues,
): ArbeidssituasjonSøknadsdata | undefined => {
    try {
        const data: ArbeidssituasjonSøknadsdata = {
            arbeidsgivere: extractArbeidssituasjonAnsattSøknadsdata(søknadsperiode, formValues.ansatt_arbeidsforhold),
            frilans: extractArbeidssituasjonFrilansSøknadsdata(søknadsperiode, formValues.frilans),
            selvstendig: extractArbeidssituasjonSelvstendigSøknadsdata(søknadsperiode, formValues.selvstendig),
            opptjeningUtland: extractOpptjeningUtlandSøknadsdata(formValues),
            utenlandskNæring: extractUtenlandskNæringSøknadsdata(formValues),
        };

        return data;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return undefined;
    }
};
