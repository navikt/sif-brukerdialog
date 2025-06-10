import { NavigateFunction } from 'react-router-dom';

export const navigateToInnsynForside = (navigate: NavigateFunction) => {
    const url = '/';
    navigate(url, { replace: true });
};
