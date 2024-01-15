import { Heading, HeadingProps, Panel } from '@navikt/ds-react';
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import bemUtils from '../../utils/bemUtils';
import CircleIllustration from './circle-illustration/CircleIllustration';

const bem = bemUtils('sectionPanel');

interface Props {
    id?: string;
    title?: React.ReactNode;
    additionalInfo?: React.ReactNode;
    ariaTitle?: string;
    illustration?: React.ReactNode;
    children: ReactNode;
    titleTag?: HeadingProps['level'];
    titleSize?: HeadingProps['size'];
    illustrationPlacement?: 'inside' | 'outside';
    introHeader?: React.ReactNode;
    tag?: 'section' | 'article';
}

const SectionOrArticle = (
    props: { tag: 'section' | 'article'; children: React.ReactNode } & React.PropsWithChildren<any>,
) => {
    const { tag, children, ...rest } = props;
    return React.createElement(tag, rest, children);
};

const SectionPanel = ({
    id,
    title,
    additionalInfo,
    ariaTitle,
    illustration,
    children,
    titleTag = '1',
    titleSize = 'medium',
    tag = 'section',
    illustrationPlacement = 'inside',
    introHeader,
}: Props) => {
    return (
        <SectionOrArticle
            tag={tag}
            tabIndex={-1}
            id={id}
            aria-label={ariaTitle}
            className={classNames(
                bem.block,
                bem.modifierConditional(
                    'illustrationOutside',
                    illustration !== undefined && illustrationPlacement === 'outside',
                ),
            )}>
            <Panel className={bem.element('panel')}>
                {illustration && (
                    <div className={bem.element('illustration')}>
                        <CircleIllustration backgroundColor="white" illustration={illustration} />
                    </div>
                )}
                {(introHeader || title) && (
                    <div className={bem.element('headerAndTitle')}>
                        {introHeader && <div>{introHeader}</div>}
                        {title && (
                            <div className={bem.element('title')}>
                                <Heading level={titleTag} size={titleSize}>
                                    {title}
                                </Heading>
                                {additionalInfo && <div className="mt-7">{additionalInfo}</div>}
                            </div>
                        )}
                    </div>
                )}
                {children}
            </Panel>
        </SectionOrArticle>
    );
};

export default SectionPanel;
