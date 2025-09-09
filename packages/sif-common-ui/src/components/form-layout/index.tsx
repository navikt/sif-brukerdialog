import { Bleed, BoxNew, BoxNewProps, Heading, HeadingProps, HStack, VStack } from '@navikt/ds-react';

/**
 * FormSection
 * ----------------
 * Setter opp default spacing mellom innhold i en skjemaseksjon
 */

type SectionProps = { title: React.ReactNode; titleIcon?: React.ReactNode } & React.HTMLAttributes<HTMLElement>;

const Section = ({ title, titleIcon, children, ...rest }: SectionProps) => {
    return (
        <section {...rest}>
            <VStack gap="4">
                <SectionHeading level="2" size="medium" icon={titleIcon}>
                    {title}
                </SectionHeading>
                {children}
            </VStack>
        </section>
    );
};

/**
 * FormSectionHeading
 * ----------------
 * Header i en FormSection
 */

type SectionHeadingProps = { icon?: React.ReactNode } & HeadingProps;

const SectionHeading = ({ children, icon, level = '2', size = 'medium', ...rest }: SectionHeadingProps) => (
    <Heading level={level} size={size} {...rest}>
        {icon ? (
            <HStack gap="4">
                {icon}
                {children}
            </HStack>
        ) : (
            children
        )}
    </Heading>
);

/**
 * Wrapper innhold og knytter det nærmere visuelt til foregående innhold vha Bleed
 * @children Innholdet
 */
export const QuestionRelatedMessage = ({ children }: { children: React.ReactNode }) => {
    return <Bleed marginBlock="6 0">{children}</Bleed>;
};

/**
 * Wrapper innhold og knytter det nærmere visuelt til foregående innhold vha Bleed
 * @children Innholdet
 */
export const QuestionBleedTop = ({ children }: { children: React.ReactNode }) => {
    return <Bleed marginBlock="6 0">{children}</Bleed>;
};

/**
 * Questions
 * ----------------
 * Setter opp default spacing mellom innhold
 * gap=8
 */

export const Questions = ({ children }: { children: React.ReactNode }) => {
    return <VStack gap="8">{children}</VStack>;
};

/**
 * Box med bakgrunsfarge og avrundede hjørner
 * @param param0
 * @returns
 */

type PanelProps = { bleedTop?: boolean } & BoxNewProps;

const Panel = ({ bleedTop, ...rest }: PanelProps) => {
    const content = (
        <BoxNew
            borderColor="neutral-subtle"
            background="neutral-soft"
            borderRadius="8"
            borderWidth="1"
            padding={{ xs: '2', sm: '4', md: '6' }}
            {...rest}
        />
    );
    return bleedTop ? <QuestionBleedTop>{content}</QuestionBleedTop> : content;
};
export const FormLayout = {
    Panel,
    QuestionRelatedMessage,
    QuestionBleedTop,
    Questions,
    Section,
    SectionHeading,
};
