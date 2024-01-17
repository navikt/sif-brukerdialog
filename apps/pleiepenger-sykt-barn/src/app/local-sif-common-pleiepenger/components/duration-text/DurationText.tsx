import { FormattedNumber, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { Duration, durationToDecimalDuration, ensureDuration } from '@navikt/sif-common-utils';

const DurationText = ({
    duration,
    fullText,
    hideEmptyValues = false,
    type,
}: {
    duration: Partial<Duration>;
    fullText?: boolean;
    hideEmptyValues?: boolean;
    type?: 'digital' | 'decimal' | 'standard';
}): JSX.Element => {
    const timer = duration.hours || '0';
    const minutter = duration.minutes || '0';
    const intl = useIntl();

    if (type === 'decimal') {
        return (
            <>
                <FormattedNumber
                    value={durationToDecimalDuration(ensureDuration(duration))}
                    maximumFractionDigits={2}
                />
                {` `}t.
            </>
        );
    } else if (type === 'digital') {
        return (
            <>
                {timer}:{minutter}
            </>
        );
    }

    return (
        <span>
            {hideEmptyValues && timer === '0' && minutter !== '0' ? null : (
                <span style={{ whiteSpace: 'nowrap' }}>
                    {fullText ? (
                        intlHelper(intl, 'common.timer', { timer })
                    ) : (
                        <>
                            {timer} <span style={{ marginLeft: '-.125rem' }}>t. </span>
                        </>
                    )}
                </span>
            )}
            {` `}
            {hideEmptyValues && minutter === '0' && timer !== '0' ? null : (
                <span style={{ whiteSpace: 'nowrap' }}>
                    {fullText ? (
                        intlHelper(intl, 'common.minutter', { minutter })
                    ) : (
                        <>
                            {minutter} <span style={{ marginLeft: '-.125rem' }}>m.</span>
                        </>
                    )}
                </span>
            )}
        </span>
    );
};

export default DurationText;
