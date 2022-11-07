import { Heading, Loader, LoaderProps } from '@navikt/ds-react';
import React from 'react';

interface OwnProps {
    style?: 'inline' | 'block';
    'data-testid'?: string;
}

type Props = OwnProps & Pick<LoaderProps, 'size' | 'type' | 'title' | 'transparent' | 'variant'>;

const LoadingSpinner = ({ type, style = 'inline', ...rest }: Props) => {
    const spinner = <Loader type={type} {...rest} data-testid={rest['data-testid']} />;
    if (style === 'inline') {
        return <>{spinner}</>;
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '15rem',
                alignItems: 'center',
            }}>
            {spinner}
            {rest.title && (
                <Heading size="small" style={{ marginTop: '1rem' }}>
                    {rest.title}
                </Heading>
            )}
        </div>
    );
};

export default LoadingSpinner;
