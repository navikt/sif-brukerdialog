import { Alert, BodyShort } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import dayjs from 'dayjs';
import { Arbeidsuke } from '../../types/K9Sak';
import { EndreArbeidstidFormField, EndreArbeidstidFormValues } from './EndreArbeidstidForm';
import { getUkerForEndring } from './endreArbeidstidFormUtils';
import { EndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';
import { getPeriodeTekst } from '../periode-tekst/PeriodeTekst';
import { getWeeksInDateRange } from '@navikt/sif-common-utils/lib';
import { getDagerTekst } from '../../utils/arbeidsukeUtils';

interface Props {
    arbeidsuker: Arbeidsuke[];
    intlValues: EndreArbeidstidIntlValues;
}

const { NumberInput } = getTypedFormComponents<EndreArbeidstidFormField, EndreArbeidstidFormValues, ValidationError>();

const EndreArbeidstimerFormPart: React.FunctionComponent<Props> = ({ arbeidsuker }) => {
    if (arbeidsuker.length === 0) {
        return <Alert variant="info">Ingen uker er valgt</Alert>;
    }
    const { spørOmSnittUker, spørOmFørsteUke, spørOmSisteUke } = getUkerForEndring(arbeidsuker);

    const renderTimerSpørsmål = ({
        label,
        fieldName,
        dateTestid,
        description,
    }: {
        label: string;
        fieldName: EndreArbeidstidFormField;
        dateTestid?: string;
        description?: React.ReactNode;
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
                return getNumberValidator({
                    required: true,
                    min: 0,
                    max: 100,
                })(value);
            }}
        />
    );

    const getSnittPeriode = (): DateRange => {
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

    const getSnittPeriodeTekst = (periode: DateRange): React.ReactNode => {
        return getPeriodeTekst(periode);
    };

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

    return (
        <>
            {arbeidsuker.length > 1 && (spørOmFørsteUke || spørOmSisteUke) && (
                <Alert variant="info">
                    Noen av ukene går ikke over de samme ukedagene, så du må oppgi arbeidstiden for disse hver for seg.
                </Alert>
            )}

            {spørOmFørsteUke && (
                <FormBlock>
                    {renderTimerSpørsmål({
                        label: `Hvor mange timer jobber du ${getPeriodeTekst(arbeidsuker[0].periode)} (${getDagerTekst(
                            arbeidsuker[0].periode
                        )})?`,
                        fieldName: EndreArbeidstidFormField.timerFørsteUke,
                        description: `${getUkerPeriode(arbeidsuker[0].periode)}`,
                        dateTestid: 'timer-førsteUke-verdi',
                    })}
                </FormBlock>
            )}
            {spørOmSnittUker && (
                <FormBlock>
                    {renderTimerSpørsmål({
                        label: `Hvor mange timer jobber du i snitt per uke, i perioden ${getSnittPeriodeTekst(
                            getSnittPeriode()
                        )}? `,
                        fieldName: EndreArbeidstidFormField.snittTimerPerUke,
                        description: `${getUkerPeriode(getSnittPeriode())}`,
                        dateTestid: 'timer-verdi',
                    })}
                </FormBlock>
            )}
            {spørOmSisteUke && (
                <FormBlock>
                    {renderTimerSpørsmål({
                        label: `Hvor mange timer jobber du ${getPeriodeTekst(
                            arbeidsuker[arbeidsuker.length - 1].periode
                        )} (${getDagerTekst(arbeidsuker[arbeidsuker.length - 1].periode)})?`,
                        fieldName: EndreArbeidstidFormField.timerSisteUke,
                        description: `${getUkerPeriode(arbeidsuker[arbeidsuker.length - 1].periode)}`,
                        dateTestid: 'timer-sisteUke-verdi',
                    })}
                </FormBlock>
            )}
        </>
    );
};

export default EndreArbeidstimerFormPart;
