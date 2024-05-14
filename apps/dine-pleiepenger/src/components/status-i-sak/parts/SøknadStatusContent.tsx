import { ReadMore, VStack } from '@navikt/ds-react';
import { useMessages } from '../../../i18n';
import { Pleiepengesøknad } from '../../../server/api-models/InnsendelseSchema';
import { getArbeidsgiverinfoFraSøknad } from '../../../utils/sakUtils';
import ArbeidsgivereISøknad from './ArbeidsgivereISøknad';
import Dokumenter from './Dokumenter';

interface Props {
    søknad: Pleiepengesøknad;
}

const SøknadStatusContent = ({ søknad }: Props) => {
    const { text } = useMessages();
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
                <Dokumenter
                    dokumenter={søknad.dokumenter}
                    tittel={text('statusISak.søknadStatusContent.dokumenterISøknad')}
                />
                {harArbeidsgivere ? (
                    <ArbeidsgivereISøknad
                        søknadId={søknad.k9FormatInnsendelse.søknadId}
                        arbeidsgivere={arbeidsgivere}
                    />
                ) : null}
            </VStack>
        </ReadMore>
    );
};

export default SøknadStatusContent;
