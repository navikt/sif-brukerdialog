import React, { useState } from 'react';
import { DateRange, dateToISOString, InputTime } from '@navikt/sif-common-formik-ds';
import {
    DateDurationMap,
    DurationWeekdays,
    getDatesWithDurationLongerThanZero,
    getDurationsInDateRange,
    getNumberDurationForWeekday,
    getWeekdayFromDate,
    removeDatesFromDateDurationMap,
} from '@navikt/sif-common-utils';
import { TidsbrukKalender } from '../..';
import { TidEnkeltdagEndring } from '../../tid/tid-enkeltdag-dialog/TidEnkeltdagForm';
import { ArbeidsforholdType } from '../../types';
import ArbeidstidEnkeltdagDialog from '../arbeidstid-enkeltdag-dialog/ArbeidstidEnkeltdagDialog';
import ArbeidstidEnkeltdagTekst from './components/arbeidstid-enkeltdag-tekst/ArbeidstidEnkeltdagTekst';
import ArbeidstidMånedTittel from './components/arbeidstid-måned-tittel/ArbeidstidMånedTittel';
import { Accordion } from '@navikt/ds-react';

export interface ArbeidstidKalenderProps {
    måned: DateRange;
    arbeidsstedNavn: string;
    arbeidsforholdType: ArbeidsforholdType;
    tidArbeidstid: DateDurationMap;
    utilgjengeligeDatoer?: Date[];
    periode: DateRange;
    skjulIngenTidEnkeltdag?: boolean;
    åpentEkspanderbartPanel?: boolean;
    arbeiderNormaltTimerFasteUkedager?: DurationWeekdays;
    månedTittelRenderer?: (måned: DateRange) => React.ReactNode;
    onEnkeltdagChange?: (evt: TidEnkeltdagEndring) => void;
    onRequestEdit?: (tid: DateDurationMap) => void;
}

const ArbeidstidKalender: React.FunctionComponent<ArbeidstidKalenderProps> = ({
    måned,
    arbeidsstedNavn,
    arbeidsforholdType,
    tidArbeidstid,
    utilgjengeligeDatoer,
    periode,
    åpentEkspanderbartPanel,
    arbeiderNormaltTimerFasteUkedager,
    skjulIngenTidEnkeltdag,
    månedTittelRenderer,
    onEnkeltdagChange,
}) => {
    const [editDate, setEditDate] = useState<{ dato: Date; tid: Partial<InputTime> } | undefined>();

    const dager: DateDurationMap = getDurationsInDateRange(tidArbeidstid, måned);
    const dagerMedTid = getDatesWithDurationLongerThanZero(dager);
    const weekday = editDate ? getWeekdayFromDate(editDate.dato) : undefined;

    const handleKalenderDatoClick = (dato: Date) => {
        const tid: Partial<InputTime> = dager[dateToISOString(dato)] || {
            hours: '',
            minutes: '',
        };
        setEditDate({ dato, tid });
    };
    return (
        <Accordion>
            <Accordion.Item defaultOpen={åpentEkspanderbartPanel}>
                <Accordion.Header>
                    {månedTittelRenderer ? (
                        månedTittelRenderer(måned)
                    ) : (
                        <ArbeidstidMånedTittel måned={måned} antallDagerMedTid={dagerMedTid.length} />
                    )}
                </Accordion.Header>
                <Accordion.Content>
                    {
                        <>
                            <TidsbrukKalender
                                periode={måned}
                                dager={dager}
                                utilgjengeligeDatoer={utilgjengeligeDatoer}
                                skjulTommeDagerIListe={true}
                                visOpprinneligTid={false}
                                tidRenderer={({ tid, prosent }) => (
                                    <ArbeidstidEnkeltdagTekst
                                        tid={tid}
                                        prosent={prosent}
                                        skjulIngenTid={skjulIngenTidEnkeltdag}
                                    />
                                )}
                                onDateClick={onEnkeltdagChange ? handleKalenderDatoClick : undefined}
                            />
                            {editDate && onEnkeltdagChange && (
                                <ArbeidstidEnkeltdagDialog
                                    isOpen={editDate !== undefined}
                                    formProps={{
                                        dato: editDate.dato,
                                        tid: editDate.tid,
                                        periode,
                                        maksTid:
                                            weekday && arbeiderNormaltTimerFasteUkedager
                                                ? getNumberDurationForWeekday(
                                                      arbeiderNormaltTimerFasteUkedager,
                                                      weekday,
                                                  )
                                                : undefined,
                                        onSubmit: (evt) => {
                                            setEditDate(undefined);
                                            const dagerMedTid = utilgjengeligeDatoer
                                                ? removeDatesFromDateDurationMap(evt.dagerMedTid, utilgjengeligeDatoer)
                                                : evt.dagerMedTid;
                                            setTimeout(() => {
                                                /** TimeOut pga komponent unmountes */
                                                onEnkeltdagChange({ ...evt, dagerMedTid });
                                            });
                                        },
                                        onCancel: () => setEditDate(undefined),
                                    }}
                                    arbeidsstedNavn={arbeidsstedNavn}
                                    arbeidsforholdType={arbeidsforholdType}
                                />
                            )}
                        </>
                    }
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default ArbeidstidKalender;
