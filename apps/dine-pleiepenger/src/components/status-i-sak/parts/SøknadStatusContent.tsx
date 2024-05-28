import React from 'react';
import { Pleiepengesøknad } from '../../../server/api-models/SøknadSchema';
import { ReadMore, VStack } from '@navikt/ds-react';
import DokumenterISøknad from './DokumenterISøknad';
import ArbeidsgivereISøknad from './ArbeidsgivereISøknad';
import { useAppIntl } from '../../../i18n';
import { getArbeidsgiverinfoFraSøknad } from '../../../utils/sakUtils';

interface Props {
    søknad: Pleiepengesøknad;
}

const SøknadStatusContent: React.FunctionComponent<Props> = ({ søknad }) => {
    const { text } = useAppIntl();
    const arbeidsgivere = getArbeidsgiverinfoFraSøknad(søknad);
    const harArbeidsgivere = arbeidsgivere.length > 0;
    return (
        <ReadMore
            header={text(
                harArbeidsgivere
                    ? 'statusISak.søknadStatusContent.readMoreHeader'
                    : 'statusISak.søknadStatusContent.readMoreHeader.ingenArbeidsgiver',
            )}>
            <VStack gap="2" className="pt-2">
                <DokumenterISøknad søknad={søknad} tittel={text('statusISak.søknadStatusContent.dokumenterISøknad')} />
                {harArbeidsgivere ? (
                    <ArbeidsgivereISøknad søknadId={søknad.k9FormatSøknad.søknadId} arbeidsgivere={arbeidsgivere} />
                ) : null}
            </VStack>
        </ReadMore>
    );
};

export default SøknadStatusContent;
