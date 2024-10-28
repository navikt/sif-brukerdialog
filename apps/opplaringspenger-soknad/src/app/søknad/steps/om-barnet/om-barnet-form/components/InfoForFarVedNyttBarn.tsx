import { Link } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { OmBarnetFormText as Text, useOmBarnetFormIntl } from '../omBarnetFormMessages';

const InfoForFarVedNyttBarn = () => {
    const { text } = useOmBarnetFormIntl();
    return (
        <ExpandableInfo title={text('omBarnetForm.infoForFarVedNyttBarn.tittel')}>
            <p>
                <Text
                    id="omBarnetForm.infoForFarVedNyttBarn.info.1"
                    values={{
                        Lenke: (children) => (
                            <Link href="https://farskapsportal.nav.no/nb/" target="_blank">
                                {children}
                            </Link>
                        ),
                    }}
                />
            </p>
            <p>
                <Text id="omBarnetForm.infoForFarVedNyttBarn.info.2" />
            </p>
        </ExpandableInfo>
    );
};
export default InfoForFarVedNyttBarn;
