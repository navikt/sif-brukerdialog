import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { DurationText } from '@navikt/sif-common-ui';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { Duration, durationsAreEqual, ensureDuration } from '@navikt/sif-common-utils';
import { TidRenderer } from './TidsbrukKalender';
import './tidsbrukKalenderDag.less';

export type TidsbrukKalenderDagFooterRenderer = (dato: Date) => JSX.Element | undefined;

interface Props {
    dato: Date;
    tid?: Duration;
    prosent?: number;
    tidOpprinnelig?: Duration;
    visOpprinneligTid?: boolean;
    erUtilgjengelig?: boolean;
    tidRenderer?: TidRenderer;
    opprinneligTidRenderer?: TidRenderer;
    footerRenderer?: TidsbrukKalenderDagFooterRenderer;
}

const bem = bemUtils('tidsbrukKalenderDag');

const TidsbrukKalenderDag: React.FunctionComponent<Props> = ({
    dato,
    prosent,
    tid,
    tidOpprinnelig,
    visOpprinneligTid,
    tidRenderer,
    opprinneligTidRenderer,
    footerRenderer,
}) => {
    const erEndret = durationsAreEqual(tid, tidOpprinnelig) === false;

    const renderTid = (duration: Duration) =>
        tidRenderer ? tidRenderer({ tid: duration, dato, prosent }) : <DurationText duration={duration} />;

    const renderOpprinneligTid = (duration: Duration) =>
        opprinneligTidRenderer ? (
            opprinneligTidRenderer({ tid: duration, dato, prosent })
        ) : (
            <DurationText duration={duration} />
        );

    return (
        <>
            {tid && (
                <>
                    {erEndret ? (
                        <>
                            <span className={bem.block}>{renderTid(ensureDuration(tid))}</span>
                            {visOpprinneligTid && (
                                <>
                                    {tidOpprinnelig ? (
                                        <div className={bem.element('opprinneligTidWrapper')}>
                                            <BodyShort size="small" as="span" className={bem.element('opprinneligTid')}>
                                                (<span className="sr-only">Endret fra: </span>
                                                {renderOpprinneligTid(tidOpprinnelig)})
                                            </BodyShort>
                                        </div>
                                    ) : (
                                        <BodyShort size="small" as="span">
                                            (lagt til)
                                        </BodyShort>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <span className={bem.block}>
                            {renderTid(tid)} <span className="sr-only">(uendret)</span>
                        </span>
                    )}
                    {footerRenderer && <>{footerRenderer(dato)}</>}
                </>
            )}
            {tidOpprinnelig && !tid && <>{renderTid(tidOpprinnelig)}</>}
        </>
    );
};

export default TidsbrukKalenderDag;
