import { Heading, Ingress, Link } from '@navikt/ds-react';
import { PortableText } from '@portabletext/react';

interface Props {
    content: any;
}

const SanityBlock = ({ content }: Props) => {
    return (
        <PortableText
            value={content}
            components={{
                marks: {
                    link: ({ children, value }) => {
                        return <Link href={value.href}>{children}</Link>;
                    },
                },
                block: {
                    title: ({ children }) => (
                        <Heading level="3" size="medium" spacing={true}>
                            {children}
                        </Heading>
                    ),
                    ingress: ({ children }) => <Ingress>{children}</Ingress>,
                },
            }}
        />
    );
};
export default SanityBlock;
