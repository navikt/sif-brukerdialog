import { Box } from '@navikt/ds-react';

const PageBleedBox = ({ children }) => {
    return (
        <Box
            className="bg-orange-50 p-8 pb-4"
            style={{
                marginLeft: 'calc((100vw - 100%)/-2)',
                marginRight: 'calc((100vw - 100%)/-2)',
                padding: '2.75rem calc((100vw - 100%)/2)',
            }}>
            {children}
        </Box>
    );
};

export default PageBleedBox;
