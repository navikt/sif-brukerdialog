import { NavigateFunction } from 'react-router-dom';

export const navigateToInnsynForside = (navigate: NavigateFunction) => {
    const url = '/innsyn';
    navigate(url, { replace: true });
};
