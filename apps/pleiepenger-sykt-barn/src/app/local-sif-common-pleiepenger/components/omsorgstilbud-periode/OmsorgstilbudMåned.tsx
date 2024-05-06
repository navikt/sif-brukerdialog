import { BodyShort, ExpansionCard, Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useAppIntl } from '@i18n/index';
import { DateRange, dateToISOString, InputTime } from '@navikt/sif-common-formik-ds/src';
import { DurationText } from '@navikt/sif-common-ui';
import { DateDurationMap, durationIsZero, getDurationsInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import OmsorgstilbudEnkeltdagDialog from '../omsorgstilbud-enkeltdag/OmsorgstilbudEnkeltdagDialog';
import { TidEnkeltdagEndring } from '../tid-enkeltdag-dialog/TidEnkeltdagForm';
import TidsbrukKalender from '../tidsbruk-kalender/TidsbrukKalender';
import { ExpansionCardContent, ExpansionCardHeader } from '@navikt/ds-react/ExpansionCard';
import { AppText } from '../../../i18n';

interface Props {
    måned: DateRange;
    tidOmsorgstilbud: DateDurationMap;
    utilgjengeligeDatoer?: Date[];
    månedTittelHeadingLevel?: '2' | '3';
    periode: DateRange;
    defaultOpen?: boolean;
    onEnkeltdagChange?: (evt: TidEnkeltdagEndring) => void;
}

const OmsorgstilbudMåned: React.FunctionComponent<Props> = ({
    måned,
    tidOmsorgstilbud,
    utilgjengeligeDatoer,
    månedTittelHeadingLevel = '2',
    periode,
    defaultOpen,
    onEnkeltdagChange,
}) => {
    const { text } = useAppIntl();
    const [editDate, setEditDate] = useState<{ dato: Date; tid: Partial<InputTime> } | undefined>();

    const dager: DateDurationMap = getDurationsInDateRange(tidOmsorgstilbud, måned);
    const dagerMedRegistrertOmsorgstilbud: string[] = Object.keys(dager).filter((key) => {
        const datoTid = dager[key];
        return datoTid !== undefined && datoTid !== undefined && durationIsZero(datoTid) === false;
    });

    const label = text('omsorgstilbudMåned.ukeOgÅr', { ukeOgÅr: dayjs(måned.from).format('MMMM YYYY') });
    return (
        <ExpansionCard defaultOpen={defaultOpen} aria-label={label}>
            <ExpansionCardHeader>
                <Heading level={månedTittelHeadingLevel} size="xsmall">
                    <AppText
                        id="omsorgstilbudMåned.ukeOgÅr"
                        values={{ ukeOgÅr: dayjs(måned.from).format('MMMM YYYY') }}
                    />{' '}
                    <BodyShort as="div">
                        {dagerMedRegistrertOmsorgstilbud.length === 0 ? (
                            <AppText id="omsorgstilbudMåned.dagerRegistrert.ingenDager" />
                        ) : (
                            <AppText
                                id="omsorgstilbudMåned.dagerRegistrert.dager"
                                values={{ dager: dagerMedRegistrertOmsorgstilbud.length }}
                            />
                        )}
                    </BodyShort>
                </Heading>
            </ExpansionCardHeader>
            <></>
            <ExpansionCardContent>
                <TidsbrukKalender
                    periode={måned}
                    dager={dager}
                    utilgjengeligeDatoer={utilgjengeligeDatoer}
                    skjulTommeDagerIListe={true}
                    visOpprinneligTid={false}
                    tidRenderer={({ tid, prosent }) => {
                        if (prosent !== undefined && prosent > 0) {
                            return (
                                <>
                                    <div>{prosent} %</div>
                                    <div className="beregnetTid">
                                        (<DurationText duration={tid} />)
                                    </div>
                                </>
                            );
                        }
                        if (tid.hours === '0' && tid.minutes === '0') {
                            return <></>;
                        }
                        return <DurationText duration={tid} />;
                    }}
                    onDateClick={
                        onEnkeltdagChange
                            ? (dato) => {
                                  const tid: Partial<InputTime> = dager[dateToISOString(dato)] || {
                                      hours: '',
                                      minutes: '',
                                  };
                                  setEditDate({ dato, tid });
                              }
                            : undefined
                    }
                />
                {editDate && onEnkeltdagChange && (
                    <OmsorgstilbudEnkeltdagDialog
                        open={editDate !== undefined}
                        formProps={{
                            periode,
                            dato: editDate.dato,
                            tid: editDate.tid,
                            onSubmit: (evt: any) => {
                                setEditDate(undefined);
                                setTimeout(() => {
                                    /** TimeOut pga komponent unmountes */
                                    onEnkeltdagChange(evt);
                                });
                            },
                            onCancel: () => setEditDate(undefined),
                        }}
                    />
                )}
            </ExpansionCardContent>
        </ExpansionCard>
    );
};

export default OmsorgstilbudMåned;
