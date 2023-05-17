import { isDateInDateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import {
    ArbeidAktivitet,
    ArbeidAktivitetType,
    ArbeiderIPeriodenSvar,
    Arbeidsforhold,
    ArbeidstidEndringMap,
    LovbestemtFerieSøknadsdata,
} from '@types';
import ArbeidsaktivitetBlock from '../../../../components/arbeidsaktivitet-block/ArbeidsaktivitetBlock';
import { ArbeidsaktivitetFormValues, ArbeidstidFormFields } from '../ArbeidstidForm';
import ArbeidsaktivitetContent from './components/ArbeidsaktivitetContent';
import './arbeidsaktivitetContentHeader.scss';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
    arbeidsforhold?: Arbeidsforhold;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    renderAsExpansionCard?: boolean;
    expansionCardDefaultOpen?: boolean;
    aktivitetFormValues: ArbeidsaktivitetFormValues;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    onArbeidstidAktivitetChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const ArbeidsaktivitetFormPart = ({
    arbeidAktivitet,
    lovbestemtFerie,
    renderAsExpansionCard,
    expansionCardDefaultOpen,
    aktivitetFormValues,
    onArbeidstidAktivitetChange,
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
            <ArbeidsaktivitetBlock
                type={arbeidAktivitet.type}
                navn={arbeidAktivitet.navn}
                arbeidsgiver={
                    arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker ? arbeidAktivitet.arbeidsgiver : undefined
                }
                endret={harEndringer ? { tekst: 'Endret arbeidstid' } : undefined}
                erUkjent={
                    arbeidAktivitet.type === ArbeidAktivitetType.arbeidstaker &&
                    arbeidAktivitet.erUkjentArbeidsaktivitet
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
                    onArbeidstidAktivitetChange={onArbeidstidAktivitetChange}
                />
            </ArbeidsaktivitetBlock>
        </div>
    );
};

export default ArbeidsaktivitetFormPart;
