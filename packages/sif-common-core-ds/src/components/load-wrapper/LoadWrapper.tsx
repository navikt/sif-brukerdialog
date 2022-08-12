import React from 'react';
import bemUtils from '../../utils/bemUtils';
import LoadingPage from '../loading-page/LoadingPage';

interface Props {
    isLoading: boolean;
    contentRenderer: () => React.ReactNode;
}

const bem = bemUtils('loadWrapper');

const LoadWrapper = ({ isLoading, contentRenderer }: Props) => (
    <div className={bem.classNames(bem.block, bem.modifierConditional('loading', isLoading))}>
        {isLoading && <LoadingPage />}
        {!isLoading && <>{contentRenderer()}</>}
    </div>
);

export default LoadWrapper;
