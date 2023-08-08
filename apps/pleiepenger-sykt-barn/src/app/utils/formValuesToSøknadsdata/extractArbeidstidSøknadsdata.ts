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
        frilans: values.frilans?.arbeidsforhold?.arbeidIPeriode
            ? extractArbeidIPeriodeSøknadsdata(values.frilans?.arbeidsforhold?.arbeidIPeriode)
            : undefined,
        selvstendig: values.selvstendig?.arbeidsforhold?.arbeidIPeriode
            ? extractArbeidIPeriodeSøknadsdata(values.selvstendig?.arbeidsforhold.arbeidIPeriode)
            : undefined,
    };
    return data;
};
