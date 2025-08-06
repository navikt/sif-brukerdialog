import { Bleed, Box, Heading, VStack } from '@navikt/ds-react';

/**
 * FormSection
 * ----------------
 * Setter opp default spacing mellom innhold i en skjemaseksjon
 * gap=8
 */

const Section = ({ title, children }: { title?: string; children?: React.ReactNode }) => {
    return (
        <VStack gap="4">
            {title ? <SectionHeading>{title}</SectionHeading> : null}
            <Questions>{children}</Questions>
        </VStack>
    );
};

/**
 * FormSectionHeading
 * ----------------
 * Header i en FormSection
 */

const SectionHeading = ({ children }: { children?: React.ReactNode }) => (
    <Heading level="2" size="medium">
        {children}
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
const Panel = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box padding="6" paddingBlock="6" style={{ backgroundColor: 'var(--a-gray-50)' }} borderRadius="medium">
            {children}
        </Box>
    );
};
export const FormLayout = {
    Panel,
    QuestionRelatedMessage,
    QuestionBleedTop,
    Questions,
    Section,
    SectionHeading,
};
