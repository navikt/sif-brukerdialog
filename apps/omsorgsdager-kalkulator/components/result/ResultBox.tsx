import * as React from 'react';
import { PropsWithChildren, useEffect } from 'react';
import SvgChild from '../svgs/SvgChild';
import SvgChildSad from '../svgs/SvgChildSad';
import bemUtils from '../../utils/bemUtils';
import { BodyLong, Heading } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
export const bem = bemUtils('OmsCalcResultBox');

const resultWrapperClassName = (type: ResultBoxType): string => {
    switch (type) {
        case 'WARNING':
            return bem.element('result-wrapper-orange');
        default:
            return bem.element('result-wrapper-green');
    }
};

const resultTopArrowClassName = (type: ResultBoxType): string => {
    switch (type) {
        case 'WARNING':
            return bem.element('result-top-arrow-orange');
        default:
            return bem.element('result-top-arrow-green');
    }
};

type ResultBoxType = 'SUCCESS' | 'WARNING';

interface Props {
    type: ResultBoxType;
    children: React.ReactNode;
}

const ResultBox: React.FC<Props> = ({ type, children }: PropsWithChildren<Props>) => {
    const box = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (box && box.current) {
            box.current.focus({ preventScroll: false });
            box.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, []);

    return (
        <div ref={box} tabIndex={-1}>
            <div className="mt-8">
                <div className={resultWrapperClassName(type)}>
                    <div className={bem.element('result-top-arrow-wrapper')}>
                        <div className={resultTopArrowClassName(type)}></div>
                    </div>
                    <div className={bem.element('result-content')}>
                        <div className={bem.element('result-child-wrapper')}>
                            {type === 'SUCCESS' && <SvgChild />}
                            {type === 'WARNING' && <SvgChildSad />}

                            <div className="pt-3 pl-4 sm:pl-9">
                                <Heading level="2" size="medium">
                                    <FormattedMessage id={'resultat-area.title'} />
                                </Heading>
                                <BodyLong className="pb-3 text-justify" size="medium">
                                    <FormattedMessage id={'resultat-area.green.1'} />
                                </BodyLong>
                            </div>
                        </div>
                        <div className={bem.element('result-content-wrapper')}>
                            <div>{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultBox;
