import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
// import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { dateFormatter, getDatesInDateRange, getWeeksInDateRange } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ArbeidAktivitet, Arbeidsuke } from '../../types/Sak';
import { getDagerTekst } from '../../utils/arbeidsukeUtils';
import { getPeriodeTekst } from '../periode-tekst/PeriodeTekst';
import { EndreArbeidstidFormField, EndreArbeidstidFormValues } from './EndreArbeidstidForm';
import { getArbeidsukerPerÅr, getUkerForEndring, UkerForEndringType } from './endreArbeidstidFormUtils';
import { EndreArbeidstidIntlValues } from './endreArbeidstidIntlValues';

interface Props {
    arbeidAktivitet: ArbeidAktivitet;
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

    const erEnkeltukeEndring = arbeidsuker.length === 1;

    return (
        <>
            {arbeidsuker.length > 1 && spørOmFørsteUke && spørOmSisteUke && (
                <Alert variant="info">
                    Den første og den siste uken er kortere enn en vanlig uke. Du må derfor oppgi arbeidstid for disse
                    to ukene hver for seg.
                </Alert>
            )}
            {arbeidsuker.length > 1 && spørOmFørsteUke && !spørOmSisteUke && (
                <Alert variant="info">
                    Den første uken er kortere enn de andre ukene. Du må derfor oppgi arbeidstid for denne uken for seg
                    selv.
                </Alert>
            )}
            {arbeidsuker.length > 1 && !spørOmFørsteUke && spørOmSisteUke && (
                <Alert variant="info">
                    Den siste uken er kortere enn de andre ukene. Du må derfor oppgi arbeidstid for denne uken for seg
                    selv.
                </Alert>
            )}

            {arbeidsuker.length > 1 && (
                <Block margin="xl">
                    <Heading level="2" size="small">
                        Oppgi antall timer du jobber per uke
                    </Heading>
                </Block>
            )}

            {spørOmFørsteUke && renderSpørsmålFørsteUke(arbeidsuker[0], erEnkeltukeEndring)}
            {spørOmSnittUker && renderSpørsmålSnittUker(arbeidsuker, ukerForEndring, erEnkeltukeEndring)}
            {spørOmSisteUke && renderSpørsmålSisteUke(arbeidsuker[arbeidsuker.length - 1], erEnkeltukeEndring)}
        </>
    );
};

export default EndreArbeidstimerFormPart;

const erKortUke = (uke: DateRange) => {
    return getDatesInDateRange(uke, true).length < 5;
};

const getUkeTekst = (dato: Date) => `${dayjs(dato).isoWeek()}`;
// const getUkeOgÅrTekst = (dato: Date) => `${dayjs(dato).isoWeek()} (${dayjs(dato).isoWeekYear()})`;

const getTimerEnUkeLabel = (arbeidsuke: Arbeidsuke): React.ReactNode => {
    const ukeOgÅr = getUkeTekst(arbeidsuke.periode.from);
    return erKortUke(arbeidsuke.periode)
        ? `Hvor mange timer jobber du uke ${ukeOgÅr}? Obs - kort uke.`
        : `Hvor mange timer jobber du uke ${ukeOgÅr}?`;
};

const getUkerPeriode = (periode: DateRange): React.ReactNode => {
    const uker = getWeeksInDateRange(periode);
    if (uker.length === 0) {
        return 'Ingen uke.';
    }
    if (uker.length === 1) {
        const uke = uker[0];
        const day = dayjs(uke.from);
        return `${erKortUke(uke) ? 'Kort uke - uke' : 'Uke'} ${day.isoWeek()} (${day.isoWeekYear()})`;
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
    label: React.ReactNode;
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
        description={description ? <BodyShort className="capsFirstChar">{description}</BodyShort> : undefined}
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

const renderSpørsmålFørsteUke = (arbeidsuke: Arbeidsuke, erEnkeltukeEndring: boolean) => {
    const periode = `${getPeriodeTekst(arbeidsuke.periode)} (${getDagerTekst(arbeidsuke.periode)})`;
    const label = erEnkeltukeEndring ? getTimerEnUkeLabel(arbeidsuke) : getUkerPeriode(arbeidsuke.periode);
    return (
        <FormBlock>
            {renderTimerSpørsmål({
                label: <>{label}</>,
                fieldName: EndreArbeidstidFormField.timerFørsteUke,
                description: getDagerPeriode(arbeidsuke.periode),
                dateTestid: 'timer-førsteUke-verdi',
                periode,
                maksTimer: getDatesInDateRange(arbeidsuke.periode).length * 24,
            })}
        </FormBlock>
    );
};

const renderSpørsmålSnittUker = (
    arbeidsuker: Arbeidsuke[],
    ukerForEndring: UkerForEndringType,
    enkeltukeEndring?: boolean
) => {
    const periode = `${getPeriodeTekst(getSnittPeriode(arbeidsuker, ukerForEndring))}`;

    const ukerPerÅr = getArbeidsukerPerÅr(arbeidsuker);

    const getUkerOgÅrTekst = () => {
        const årKeys = Object.keys(ukerPerÅr);
        if (årKeys.length === 1) {
            return getUkerTekstListe(ukerPerÅr[årKeys[0]]);
        }
        const årTekst = årKeys
            .map((år) => {
                return `${år}: uke ${getUkerTekstListe(ukerPerÅr[år])}`;
            })
            .join('. ');

        return årTekst;
    };

    return (
        <FormBlock>
            {renderTimerSpørsmål({
                label: enkeltukeEndring ? getTimerEnUkeLabel(arbeidsuker[0]) : `Hele uker - ${getUkerOgÅrTekst()}`,
                fieldName: EndreArbeidstidFormField.snittTimerPerUke,
                description: `Antall timer i snitt per uke`, //`${getUkerPeriode(getSnittPeriode(arbeidsuker, ukerForEndring))}`,
                dateTestid: 'timer-verdi',
                periode,
                maksTimer: 7 * 24,
            })}
        </FormBlock>
    );
};

const renderSpørsmålSisteUke = (arbeidsuke: Arbeidsuke, erEnkeltukeEndring: boolean) => {
    const periode = `${getPeriodeTekst(arbeidsuke.periode)} (${getDagerPeriode(arbeidsuke.periode)})`;
    const label = erEnkeltukeEndring ? getTimerEnUkeLabel(arbeidsuke) : getUkerPeriode(arbeidsuke.periode);
    return (
        <FormBlock>
            {renderTimerSpørsmål({
                label: label,
                fieldName: EndreArbeidstidFormField.timerSisteUke,
                description: getDagerPeriode(arbeidsuke.periode),
                dateTestid: 'timer-sisteUke-verdi',
                periode,
                maksTimer: getDatesInDateRange(arbeidsuke.periode).length * 24,
            })}
        </FormBlock>
    );
};

export const getDagerPeriode = ({ from, to }: DateRange, visDato = true): string => {
    const fra = visDato ? dateFormatter.dayDateMonthYear(from) : dateFormatter.day(from);
    const til = visDato ? dateFormatter.dayDateMonthYear(to) : dateFormatter.day(to);
    if (fra === til) {
        return fra;
    }
    return `${fra} til ${til}`;
};

const getUkerTekstListe = (uker: Arbeidsuke[]) => {
    const ukerTekst = uker
        .map((a) => a.periode.from)
        .map((from) => dayjs(from).isoWeek())
        .join(', ');

    return ukerTekst;
};
