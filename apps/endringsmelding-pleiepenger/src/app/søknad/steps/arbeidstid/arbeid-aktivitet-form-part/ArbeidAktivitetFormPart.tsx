import { isDateInDateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import {
    ArbeidAktivitet,
    ArbeidAktivitetType,
    ArbeiderIPeriodenSvar,
    Arbeidsforhold,
    ArbeidstidEndringMap,
    LovbestemtFerieSøknadsdata,
} from '@types';
import ArbeidAktivitetBlock from '../../../../components/arbeid-aktivitet-block/ArbeidAktivitetBlock';
import { ArbeidsaktivitetFormValues, ArbeidstidFormFields } from '../ArbeidstidForm';
import ArbeidsaktivitetContent from './components/ArbeidAktivitetContent';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    arbeidsforhold?: Arbeidsforhold;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    renderAsExpansionCard?: boolean;
    expansionCardDefaultOpen?: boolean;
    aktivitetFormValues: ArbeidsaktivitetFormValues;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    onArbeidstidChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const ArbeidAktivitetFormPart = ({
    arbeidAktivitet,
    lovbestemtFerie,
    renderAsExpansionCard,
    expansionCardDefaultOpen,
    aktivitetFormValues,
    onArbeidstidChange,
}: Props) => {
    const aktivitetFieldName = `${ArbeidstidFormFields.arbeidAktivitet}.${arbeidAktivitet.key}`;
    const endringer = aktivitetFormValues?.endringer;
    const perioder = arbeidAktivitet.perioderMedArbeidstid;

    const harEndringer =
        endringer !== undefined &&
        perioder.some((periode) => {
            return Object.keys(endringer)
                .map(ISODateRangeToDateRange)
                .some((dr) => isDateInDateRange(dr.from, periode));
        });

    return (
        <div data-testid={`aktivitet_${arbeidAktivitet.key}`}>
            <ArbeidAktivitetBlock
                type={arbeidAktivitet.type}
                navn={arbeidAktivitet.navn}
                arbeidsgiver={
                    arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker ? arbeidAktivitet.arbeidsgiver : undefined
                }
                endret={harEndringer ? { tekst: 'Endret arbeidstid' } : undefined}
                erUkjent={
                    arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker && arbeidAktivitet.erUkjentArbeidsforhold
                }
                renderAsExpansionCard={renderAsExpansionCard}
                expansionCardDefaultOpen={expansionCardDefaultOpen}>
                <ArbeidsaktivitetContent
                    perioder={perioder}
                    arbeidAktivitet={arbeidAktivitet}
                    lovbestemtFerie={lovbestemtFerie}
                    endringer={endringer}
                    parentFieldName={aktivitetFieldName}
                    formValues={aktivitetFormValues}
                    onArbeidstidAktivitetChange={onArbeidstidChange}
                />
            </ArbeidAktivitetBlock>
        </div>
    );
};

export default ArbeidAktivitetFormPart;
