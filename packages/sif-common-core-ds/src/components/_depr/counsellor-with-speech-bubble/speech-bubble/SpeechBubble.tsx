import { Heading } from '@navikt/ds-react';
import React from 'react';
import bemHelper from '../../../../utils/bemUtils';
import Block from '../../../../atoms/block/Block';
import './speechBubble.scss';

const bem = bemHelper('speechBubble');

export interface SpeechBubbleProps {
    strongText: string;
    normalText: React.ReactNode;
    bottomContent?: React.ReactNode;
}

const SpeechBubble = ({ strongText, normalText, bottomContent }: SpeechBubbleProps) => (
    <div className={bem.block}>
        <Heading level="2" size="xsmall" className={bem.element('strongText')}>
            {strongText}
        </Heading>
        <Block margin="m">
            <p className={bem.element('normalText')}>{normalText}</p>
        </Block>
        {bottomContent && (
            <Block margin="m">
                <div className={bem.element('bottomContent')}> {bottomContent}</div>
            </Block>
        )}
        <div className={bem.element('triangle')} />
    </div>
);

export default SpeechBubble;
