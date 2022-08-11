import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Banner from '../../components/banner/Banner';
import bemHelper from '../../utils/bemUtils';
import './stepBanner.scss';

interface Props {
    text: string;
    tag?: 'h1' | 'h2' | 'h3';
}

const bem = bemHelper('stepBanner');
const StepBanner = ({ text, tag = 'h2' }: Props) => (
    <Banner size="small" className={bem.block}>
        <Undertittel tag={tag}>{text}</Undertittel>
    </Banner>
);

export default StepBanner;
