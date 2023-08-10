import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DateRange, dateToISOString, InputTime } from '@navikt/sif-common-formik/lib';
import { DateDurationMap, durationIsZero, getDurationsInDateRange } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { DurationText, OmsorgstilbudEnkeltdagDialog, TidsbrukKalender } from '../..';
import { TidEnkeltdagEndring } from '../../tid/tid-enkeltdag-dialog/TidEnkeltdagForm';

interface Props {
    måned: DateRange;
    tidOmsorgstilbud: DateDurationMap;
    utilgjengeligeDatoer?: Date[];
    månedTittelHeadingLevel?: number;
    periode: DateRange;
    åpentEkspanderbartPanel?: boolean;
    onEnkeltdagChange?: (evt: TidEnkeltdagEndring) => void;
}

const OmsorgstilbudMåned: React.FunctionComponent<Props> = ({
    måned,
    tidOmsorgstilbud,
    utilgjengeligeDatoer,
    månedTittelHeadingLevel = 2,
    periode,
    åpentEkspanderbartPanel,
    onEnkeltdagChange,
}) => {
    const [editDate, setEditDate] = useState<{ dato: Date; tid: Partial<InputTime> } | undefined>();

    const dager: DateDurationMap = getDurationsInDateRange(tidOmsorgstilbud, måned);
    const dagerMedRegistrertOmsorgstilbud: string[] = Object.keys(dager).filter((key) => {
        const datoTid = dager[key];
        return datoTid !== undefined && datoTid !== undefined && durationIsZero(datoTid) === false;
    });

    return (
        <Ekspanderbartpanel
            renderContentWhenClosed={false}
            apen={åpentEkspanderbartPanel}
            tittel={
                <>
                    <Element tag={`h${månedTittelHeadingLevel}`}>
                        <FormattedMessage
                            id="omsorgstilbudMåned.ukeOgÅr"
                            values={{ ukeOgÅr: dayjs(måned.from).format('MMMM YYYY') }}
                        />{' '}
                        <Normaltekst tag="div">
                            {dagerMedRegistrertOmsorgstilbud.length === 0 ? (
                                <FormattedMessage id="omsorgstilbudMåned.dagerRegistrert.ingenDager" />
                            ) : (
                                <FormattedMessage
                                    id="omsorgstilbudMåned.dagerRegistrert.dager"
                                    values={{ dager: dagerMedRegistrertOmsorgstilbud.length }}
                                />
                            )}
                        </Normaltekst>
                    </Element>
                </>
            }>
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
                                {1 + 1 === 2 && (
                                    <div className="beregnetTid">
                                        (<DurationText duration={tid} />)
                                    </div>
                                )}
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
                    isOpen={editDate !== undefined}
                    formProps={{
                        periode,
                        dato: editDate.dato,
                        tid: editDate.tid,
                        onSubmit: (evt) => {
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
        </Ekspanderbartpanel>
    );
};

export default OmsorgstilbudMåned;
