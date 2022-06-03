/// <reference types="react" />
import { LoaderProps } from '@navikt/ds-react';
interface OwnProps {
    style?: 'inline' | 'block';
    blockTitle?: string;
    'data-testid'?: string;
}
declare type Props = OwnProps & LoaderProps;
declare const LoadingSpinner: ({ type, size, style, blockTitle, ...rest }: Props) => JSX.Element;
export default LoadingSpinner;
