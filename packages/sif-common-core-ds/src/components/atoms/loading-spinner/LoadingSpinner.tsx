import { Heading, Loader, LoaderProps } from '@navikt/ds-react';
import React from 'react';

interface OwnProps {
    style?: 'inline' | 'block';
    blockTitle?: string;
    'data-testid'?: string;
}

type Props = OwnProps & LoaderProps;

const LoadingSpinner = ({ type, size, style = 'inline', blockTitle, ...rest }: Props) => {
    const spinner = <Loader type={type} size={size} data-testid={rest['data-testid']} />;
    if (style === 'inline') {
        return spinner;
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
            <LoadingSpinner type="XXL" />
            {blockTitle && (
                <Heading size="medium" style={{ marginTop: '1rem' }}>
                    {blockTitle}
                </Heading>
            )}
        </div>
    );
};

export default LoadingSpinner;
