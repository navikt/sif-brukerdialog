import { Alert, BodyShort } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { getDatesInDateRange, getWeeksInDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { Arbeidsuke } from '../../types/Sak';
import { getDagerTekst } from '../../utils/arbeidsukeUtils';
import { getPeriodeTekst } from '../periode-tekst/PeriodeTekst';
import { EndreArbeidstidFormField, EndreArbeidstidFormValues } from './EndreArbeidstidForm';
import { getUkerForEndring, UkerForEndringType } from './endreArbeidstidFormUtils';
import { EndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';

interface Props {
    arbeidsuker: Arbeidsuke[];
    intlValues: EndreArbeidstidIntlValues;
}

const { NumberInput } = getTypedFormComponents<EndreArbeidstidFormField, EndreArbeidstidFormValues, ValidationError>();

const EndreArbeidstimerFormPart: React.FunctionComponent<Props> = ({ arbeidsuker }) => {
    if (arbeidsuker.length === 0) {
        return <Alert variant="info">Ingen uker er valgt</Alert>;
    }
    const ukerForEndring = getUkerForEndring(arbeidsuker);
    const { spørOmFørsteUke, spørOmSisteUke, spørOmSnittUker } = ukerForEndring;

    return (
        <>
            {arbeidsuker.length > 1 && (spørOmFørsteUke || spørOmSisteUke) && (
                <Alert variant="info">
                    Noen av ukene går ikke over de samme ukedagene, så du må oppgi arbeidstiden for disse hver for seg.
                </Alert>
            )}

            {spørOmFørsteUke && renderSpørsmålFørsteUke(arbeidsuker[0])}
            {spørOmSnittUker && renderSpørsmålSnittUker(arbeidsuker, ukerForEndring)}
            {spørOmSisteUke && renderSpørsmålSisteUke(arbeidsuker[arbeidsuker.length - 1])}
        </>
    );
};

export default EndreArbeidstimerFormPart;

const getUkerPeriode = (periode: DateRange): React.ReactNode => {
    const uker = getWeeksInDateRange(periode);
    if (uker.length === 0) {
        return 'Ingen uke.';
    }
    if (uker.length === 1) {
        const day = dayjs(uker[0].from);
        return `Uke ${day.isoWeek()} ${day.isoWeekYear()}.`;
    }
    const førsteDag = dayjs(uker[0].from);
    const sisteDag = dayjs(uker[uker.length - 1].from);
    const førsteUkenummer = førsteDag.isoWeek();
    const sisteUkenummer = sisteDag.isoWeek();
    const førsteUkeÅr = førsteDag.isoWeekYear();
    const sisteUkeÅr = sisteDag.isoWeekYear();
    if (førsteUkeÅr === sisteUkeÅr) {
        return `Fra og med uke ${førsteUkenummer}, til og med uke ${sisteUkenummer} ${sisteUkeÅr}.`;
    }
    return `Fra og med uke ${førsteUkenummer} ${førsteUkeÅr}, til og med uke ${sisteUkenummer} ${sisteUkeÅr}.`;
};

const renderTimerSpørsmål = ({
    label,
    fieldName,
    dateTestid,
    description,
    periode,
    maksTimer,
}: {
    label: string;
    fieldName: EndreArbeidstidFormField;
    dateTestid?: string;
    description?: React.ReactNode;
    periode: string;
    maksTimer: number;
}) => (
    <NumberInput
        className="arbeidstidUkeInput"
        name={fieldName}
        label={label}
        data-testid={dateTestid}
        width="xs"
        description={description ? <BodyShort>{description}</BodyShort> : undefined}
        maxLength={4}
        validate={(value) => {
            const error = getNumberValidator({
                required: true,
                min: 0,
                max: maksTimer,
            })(value);
            if (error) {
                return {
                    key: `endreArbeidstidForm.timer.${error}`,
                    keepKeyUnaltered: true,
                    values: {
                        periode,
                        maksTimer,
                    },
                };
            }
            return undefined;
        }}
    />
);

const getSnittPeriode = (arbeidsuker: Arbeidsuke[], ukerForEndring: UkerForEndringType): DateRange => {
    const { spørOmFørsteUke, spørOmSisteUke } = ukerForEndring;
    if (spørOmFørsteUke === false && spørOmSisteUke === false) {
        return {
            from: arbeidsuker[0].periode.from,
            to: arbeidsuker[arbeidsuker.length - 1].periode.to,
        };
    }
    if (spørOmFørsteUke && !spørOmSisteUke) {
        return {
            from: arbeidsuker[1].periode.from,
            to: arbeidsuker[arbeidsuker.length - 1].periode.to,
        };
    }
    return {
        from: arbeidsuker[1].periode.from,
        to: arbeidsuker[arbeidsuker.length - 2].periode.to,
    };
};

const renderSpørsmålFørsteUke = (arbeidsuke: Arbeidsuke) => {
    const periode = `${getPeriodeTekst(arbeidsuke.periode)} (${getDagerTekst(arbeidsuke.periode)})`;
    return (
        <FormBlock>
            {renderTimerSpørsmål({
                label: `Hvor mange timer jobber du ${periode}?`,
                fieldName: EndreArbeidstidFormField.timerFørsteUke,
                description: `${getUkerPeriode(arbeidsuke.periode)}`,
                dateTestid: 'timer-førsteUke-verdi',
                periode,
                maksTimer: getDatesInDateRange(arbeidsuke.periode).length * 24,
            })}
        </FormBlock>
    );
};

const renderSpørsmålSnittUker = (arbeidsuker: Arbeidsuke[], ukerForEndring: UkerForEndringType) => {
    const periode = `${getPeriodeTekst(getSnittPeriode(arbeidsuker, ukerForEndring))}`;
    return (
        <FormBlock>
            {renderTimerSpørsmål({
                label: `Hvor mange timer jobber du i snitt per uke, i perioden ${periode}? `,
                fieldName: EndreArbeidstidFormField.snittTimerPerUke,
                description: `${getUkerPeriode(getSnittPeriode(arbeidsuker, ukerForEndring))}`,
                dateTestid: 'timer-verdi',
                periode,
                maksTimer: 7 * 24,
            })}
        </FormBlock>
    );
};

const renderSpørsmålSisteUke = (arbeidsuke: Arbeidsuke) => {
    const periode = `${getPeriodeTekst(arbeidsuke.periode)} (${getDagerTekst(arbeidsuke.periode)})`;
    return (
        <FormBlock>
            {renderTimerSpørsmål({
                label: `Hvor mange timer jobber du ${periode}?`,
                fieldName: EndreArbeidstidFormField.timerSisteUke,
                description: `${getUkerPeriode(arbeidsuke.periode)}`,
                dateTestid: 'timer-sisteUke-verdi',
                periode,
                maksTimer: getDatesInDateRange(arbeidsuke.periode).length * 24,
            })}
        </FormBlock>
    );
};
