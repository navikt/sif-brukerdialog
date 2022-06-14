import React from 'react';
import { fold, RemoteData } from '@devexperts/remote-data-ts';
import { AxiosError } from 'axios';

interface Props<T> {
    remoteData: RemoteData<AxiosError, T>;
    initializing: () => React.ReactNode;
    loading: () => React.ReactNode;
    error: (error: AxiosError) => React.ReactNode;
    success: (result: T) => React.ReactNode;
}

function RemoteDataHandler<T>({ remoteData: data, initializing, loading, error, success }: Props<T>) {
    return <>{fold(initializing, loading, error, success)(data)}</>;
}

export default RemoteDataHandler;
