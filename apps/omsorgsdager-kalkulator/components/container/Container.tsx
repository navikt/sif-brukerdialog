import { ReactNode } from 'react';
import React from 'react';
import Banner from '../banner/Banner';

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-container bg-bg-subtle">
            <Banner />
            <div className="px-4 md:px-12">
                <main className="max-w-[900px] mx-auto pb-8">{children}</main>
            </div>
        </div>
    );
};

export default Container;
