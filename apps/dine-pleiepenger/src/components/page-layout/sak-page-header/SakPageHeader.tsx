import { BodyShort, HStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { AppText, useAppIntl } from '../../../i18n';
import { Pleietrengende } from '../../../types';
import { personaliaUtils } from '../../../utils/personaliaUtils';
import PageHeader from '../page-header/PageHeader';

interface Props {
    saksnr: string;
    pleietrengende: Pleietrengende;
    tittel?: string;
    hidePleiepengerIcon?: boolean;
}

const SakPageHeader = ({ tittel, saksnr, pleietrengende, hidePleiepengerIcon }: Props) => {
    const { text } = useAppIntl();
    return (
        <PageHeader
            documentTitle={tittel || text('sakPageHeader.defaultTittel')}
            title={tittel || text('sakPageHeader.defaultTittel')}
            hidePleiepengerIcon={hidePleiepengerIcon}
            byline={
                <BodyShort as="div">
                    <HStack gap="space-8">
                        <span>
                            <AppText id="sakPageHeader.saksnr" values={{ saksnr }} />
                        </span>
                        <span aria-hidden={true} className="sakPageHeaderPipe">
                            |
                        </span>
                        {pleietrengende.anonymisert ? (
                            <AppText
                                id="sakPageHeader.pleietrengende.anonymisert"
                                values={{
                                    dato: dateFormatter.compact(pleietrengende.fødselsdato),
                                }}
                            />
                        ) : (
                            <AppText
                                id="sakPageHeader.pleietrengende"
                                values={{
                                    navn: personaliaUtils.navn(pleietrengende, text),
                                }}
                            />
                        )}
                    </HStack>
                </BodyShort>
            }
        />
    );
};

export default SakPageHeader;
