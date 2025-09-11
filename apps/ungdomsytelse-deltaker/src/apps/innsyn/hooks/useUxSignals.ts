import { useEffect, useState } from 'react';

const useUxSignals = (ready: boolean) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (mounted) {
            return;
        }
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://widget.uxsignals.com/embed.js';
        if (ready) {
            document.body.appendChild(script);
            setMounted(true);
        }

        return () => {
            try {
                document.body.removeChild(script);
            } catch {
                // do nothing
            }
        };
    }, [ready, mounted]);
};

export default useUxSignals;
