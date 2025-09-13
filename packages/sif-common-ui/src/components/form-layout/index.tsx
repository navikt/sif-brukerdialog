import { Bleed, Box, BoxNew, BoxNewProps, Heading, HeadingProps, HStack, VStack, VStackProps } from '@navikt/ds-react';
import SifGuidePanel, {
    SifGuidePanelProps,
} from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

/**
 * Setter opp default spacing mellom sections
 */

const Sections = ({ ...rest }: VStackProps) => <VStack gap="12" {...rest} />;

/**
 * Tittel og content i en seksjon
 */

type SectionProps = React.HTMLAttributes<HTMLElement> & {
    title: React.ReactNode;
    titleIcon?: React.ReactNode;
    titleLevel?: '1' | '2' | '3';
};

const Section = ({ title, titleIcon, titleLevel = '2', children, ...rest }: SectionProps) => {
    return (
        <section {...rest}>
            <SectionHeading level={titleLevel} size="medium" icon={titleIcon} spacing={true}>
                {title}
            </SectionHeading>
            {children}
        </section>
    );
};

/**
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
 * Wrapper innhold og knytter det nærmere visuelt til foregående innhold vha Bleed
 * @children Innholdet
 */
export const QuestionBleedBottom = ({ children }: { children: React.ReactNode }) => {
    return <Bleed marginBlock="0 4">{children}</Bleed>;
};

/**
 * Questions
 * ----------------
 * Setter opp default spacing mellom innhold
 * gap=8
 */

export const Questions = ({ ...rest }: VStackProps) => {
    return <VStack gap="8" {...rest} />;
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

type StepGuideWrapperProps = { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>;

const StepGuideWrapper = ({ children, ...rest }: StepGuideWrapperProps) => {
    return (
        <Box marginBlock="0 12" {...rest}>
            {children}
        </Box>
    );
};

const Guide = (props: SifGuidePanelProps) => {
    return (
        <StepGuideWrapper>
            <SifGuidePanel {...props} />
        </StepGuideWrapper>
    );
};

export const FormLayout = {
    Guide,
    Panel,
    QuestionBleedTop,
    QuestionBleedBottom,
    QuestionRelatedMessage,
    Questions,
    Section,
    SectionHeading,
    Sections,
    StepGuideWrapper,
};
