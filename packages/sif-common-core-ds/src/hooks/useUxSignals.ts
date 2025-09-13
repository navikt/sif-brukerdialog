import { useEffect } from 'react';

const useUxSignals = (ready: boolean) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://widget.uxsignals.com/embed.js';
        if (ready) {
            document.body.appendChild(script);
        }

        return () => {
            try {
                document.body.removeChild(script);
            } catch {
                // do nothing
            }
        };
    }, [ready]);
};

export default useUxSignals;
