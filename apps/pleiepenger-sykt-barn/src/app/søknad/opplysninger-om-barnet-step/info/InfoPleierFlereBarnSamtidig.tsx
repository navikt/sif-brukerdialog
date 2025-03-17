import { BodyLong, List } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

const InfoPleierFlereBarnSamtidig = () => {
    return (
        <ExpandableInfo title="Hva gjør jeg når jeg pleier flere barn samtidig?">
            <BodyLong as="div">
                <p>
                    Hvis du pleier flere barn samtidig, vurderer du selv om du vil søke om pleiepenger for begge barna.
                    Du kan uansett kun få opptil 100% pleiepenger, men i noen tilfeller er det nyttig å søke om
                    pleiepenger på begge:
                </p>

                <List>
                    <ListItem>
                        Hvis barna har ulik tid i omsorgstilbud, kan det være nødvendig å få pleiepenger pr. Barn for å
                        dekke opp for det totale inntektstapet.
                    </ListItem>
                    <ListItem>
                        Hvis ett eller begge barna også blir pleiet av andre omsorgspersoner, slik at dere skal dele
                        pleiepenger.
                    </ListItem>
                </List>

                <p>
                    Hvis du søker pleiepenger for flere barn, vil vi vurdere retten til pleiepenger individuelt per
                    barn.
                </p>
                <p>
                    Du må i så fall sende søknad om pleiepenger for hvert av barna du pleier. Du legger kun ved
                    legeerklæring for det barnet du søker om.
                </p>
            </BodyLong>
        </ExpandableInfo>
    );
};

export default InfoPleierFlereBarnSamtidig;
