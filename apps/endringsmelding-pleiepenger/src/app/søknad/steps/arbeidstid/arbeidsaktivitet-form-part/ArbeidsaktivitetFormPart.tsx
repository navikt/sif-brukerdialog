import { isDateInDateRange, ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import {
    Arbeidsaktivitet,
    ArbeidsaktivitetType,
    ArbeiderIPeriodenSvar,
    Arbeidsforhold,
    ArbeidstidEndringMap,
    LovbestemtFerieSøknadsdata,
} from '@types';
import ArbeidsaktivitetBlock from '../../../../components/arbeidsaktivitet-block/ArbeidsaktivitetBlock';
import { ArbeidsaktivitetFormValues, ArbeidstidFormFields } from '../ArbeidstidForm';
import ArbeidsaktivitetContent from './components/ArbeidsaktivitetContent';
import { useAppIntl } from '../../../../i18n';

interface Props {
    arbeidsaktivitet: Arbeidsaktivitet;
    arbeidsforhold?: Arbeidsforhold;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    renderAsExpansionCard?: boolean;
    expansionCardDefaultOpen?: boolean;
    aktivitetFormValues: ArbeidsaktivitetFormValues;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    onArbeidstidChange: (arbeidstidEndringer: ArbeidstidEndringMap) => void;
}

const ArbeidsaktivitetFormPart = ({
    arbeidsaktivitet,
    lovbestemtFerie,
    renderAsExpansionCard,
    expansionCardDefaultOpen,
    aktivitetFormValues,
    onArbeidstidChange,
}: Props) => {
    const { text } = useAppIntl();
    const aktivitetFieldName = `${ArbeidstidFormFields.arbeidsaktivitet}.${arbeidsaktivitet.key}`;
    const endringer = aktivitetFormValues?.endringer;
    const perioder = arbeidsaktivitet.perioderMedArbeidstid;

    const harEndringer =
        endringer !== undefined &&
        perioder.some((periode) => {
            return Object.keys(endringer)
                .map(ISODateRangeToDateRange)
                .some((dr) => isDateInDateRange(dr.from, periode));
        });

    return (
        <div data-testid={`aktivitet_${arbeidsaktivitet.key}`}>
            <ArbeidsaktivitetBlock
                type={arbeidsaktivitet.type}
                navn={arbeidsaktivitet.navn}
                arbeidsgiver={
                    arbeidsaktivitet.type === ArbeidsaktivitetType.arbeidstaker
                        ? arbeidsaktivitet.arbeidsgiver
                        : undefined
                }
                endret={harEndringer ? { tekst: text('arbeidsaktivitetFormPart.aktivitet.erEndret') } : undefined}
                erUkjent={
                    arbeidsaktivitet.type === ArbeidsaktivitetType.arbeidstaker &&
                    arbeidsaktivitet.erUkjentArbeidsforhold
                }
                renderAsExpansionCard={renderAsExpansionCard}
                expansionCardDefaultOpen={expansionCardDefaultOpen}>
                <ArbeidsaktivitetContent
                    perioder={perioder}
                    arbeidsaktivitet={arbeidsaktivitet}
                    lovbestemtFerie={lovbestemtFerie}
                    endringer={endringer}
                    parentFieldName={aktivitetFieldName}
                    formValues={aktivitetFormValues}
                    onArbeidstidAktivitetChange={onArbeidstidChange}
                />
            </ArbeidsaktivitetBlock>
        </div>
    );
};

export default ArbeidsaktivitetFormPart;
