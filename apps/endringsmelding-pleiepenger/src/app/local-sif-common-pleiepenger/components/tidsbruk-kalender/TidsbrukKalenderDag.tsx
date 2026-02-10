import './tidsbrukKalenderDag.less';

import { BodyShort } from '@navikt/ds-react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { DurationText } from '@navikt/sif-common-ui';
import { Duration, durationIsGreatherThanZero, durationsAreEqual, ensureDuration } from '@navikt/sif-common-utils';
import { ReactElement } from 'react';

import { TidRenderer } from './TidsbrukKalender';

export type TidsbrukKalenderDagFooterRenderer = (dato: Date) => ReactElement | undefined;

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

const TidsbrukKalenderDag = ({
    dato,
    prosent,
    tid,
    tidOpprinnelig,
    visOpprinneligTid,
    tidRenderer,
    opprinneligTidRenderer,
    footerRenderer,
}: Props) => {
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
                        <span
                            className={bem.element(
                                'endret',
                                durationIsGreatherThanZero(tid) === false ? 'ingenTid' : undefined,
                            )}>
                            <BodyShort weight="semibold" as="span" className={bem.block}>
                                {renderTid(ensureDuration(tid))}
                            </BodyShort>
                            {visOpprinneligTid && (
                                <>
                                    {tidOpprinnelig || tid ? (
                                        <div className={bem.element('opprinneligTidWrapper')}>
                                            <BodyShort size="small" as="span" className={bem.element('opprinneligTid')}>
                                                (<span className="sr-only">Endret fra: </span>
                                                {tidOpprinnelig ? renderOpprinneligTid(tidOpprinnelig) : 'Ingen tid'})
                                            </BodyShort>
                                        </div>
                                    ) : null}
                                </>
                            )}
                        </span>
                    ) : (
                        <BodyShort className={bem.block} size="small">
                            {renderTid(tid)} <span className="sr-only">(uendret)</span>
                        </BodyShort>
                    )}
                    {footerRenderer && <>{footerRenderer(dato)}</>}
                </>
            )}
            {tidOpprinnelig && !tid && (
                <span className={durationIsGreatherThanZero(tidOpprinnelig) ? bem.element('harTid') : undefined}>
                    <BodyShort size="small">{renderTid(tidOpprinnelig)}</BodyShort>
                </span>
            )}
        </>
    );
};

export default TidsbrukKalenderDag;
