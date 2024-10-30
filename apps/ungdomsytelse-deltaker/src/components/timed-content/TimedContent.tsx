import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
    timeout?: number;
}

const TimedContent = ({ children, timeout = 5000 }: Props) => {
    const [showContent, setShowContent] = React.useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShowContent(false);
        }, timeout);
    }, []);
    return showContent ? <>{children}</> : null;
};

export default TimedContent;
