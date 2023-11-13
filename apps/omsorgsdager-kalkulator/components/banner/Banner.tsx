import { Heading } from '@navikt/ds-react';
import React from 'react';
import { CalculatorSquareIcon } from '../icons/CalculatorSquareIcon';
import { FormattedMessage, useIntl } from 'react-intl';
import { intlHelper } from '@/utils/intlHelper';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/nb';

const Banner = () => {
    const intl = useIntl();
    const dato = dayjs('11.13.2023').locale(locale).format('D. MMMM YYYY');
    return (
        <header className="bg-[#ffffff] border-b-deepblue-400 border-b-4 text-center px-4 md:px-12 py-6">
            <div className="max-w-[1128px] mx-auto flex gap-8">
                <CalculatorSquareIcon />
                <div>
                    <Heading size="large" level="1" aria-label={intlHelper(intl, 'banner.title')}>
                        {intlHelper(intl, 'banner.title')}
                    </Heading>
                    <div className="flex gap-4 py-3 items-baseline">
                        <p className="text-sm">
                            <FormattedMessage id={'banner.description'} />
                        </p>
                        <p aria-hidden="true" className="text-gray-600">
                            |
                        </p>
                        <p className="text-gray-600 text-sm">
                            <FormattedMessage id={'banner.updated'} values={{ dato }} />
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Banner;
