import { SøknadFormValues } from '../../types/SøknadFormValues';
import { ArbeidstidSøknadsdata } from '../../types/søknadsdata/ArbeidstidSøknadsdata';
import { extractArbeidIPeriodeSøknadsdata } from './extractArbeidIPeriodeSøknadsdata';

export const extractArbeidstidSøknadsdata = (values: SøknadFormValues): ArbeidstidSøknadsdata | undefined => {
    const { ansatt_arbeidsforhold } = values;
    const arbeidsgivere = new Map();
    if (ansatt_arbeidsforhold) {
        ansatt_arbeidsforhold.forEach((ansatt) => {
            if (ansatt.arbeidIPeriode) {
                arbeidsgivere.set(ansatt.arbeidsgiver.id, extractArbeidIPeriodeSøknadsdata(ansatt.arbeidIPeriode));
            }
        });
    }
    const data: ArbeidstidSøknadsdata = {
        arbeidsgivere,
        frilansarbeid: values.frilans?.arbeidsforholdFrilansarbeid?.arbeidIPeriode
            ? extractArbeidIPeriodeSøknadsdata(values.frilans?.arbeidsforholdFrilansarbeid?.arbeidIPeriode)
            : undefined,
        honorararbeid: values.frilans?.arbeidsforholdHonorararbeid?.arbeidIPeriode
            ? extractArbeidIPeriodeSøknadsdata(values.frilans.arbeidsforholdHonorararbeid.arbeidIPeriode)
            : undefined,
        selvstendig: values.selvstendig?.arbeidsforhold?.arbeidIPeriode
            ? extractArbeidIPeriodeSøknadsdata(values.selvstendig?.arbeidsforhold.arbeidIPeriode)
            : undefined,
    };
    // eslint-disable-next-line no-console
    console.log(data);
    return data;
};
