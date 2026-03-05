import { ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { Bleed, Box, BoxNewProps, Button, Heading, HeadingProps, HStack, VStack, VStackProps } from '@navikt/ds-react';
import SifGuidePanel, {
    SifGuidePanelProps,
} from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

/**
 * Setter opp default spacing mellom sections
 */

const Sections = ({ ...rest }: VStackProps) => <VStack gap="space-48" {...rest} />;

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
            <HStack gap="space-16">
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
    return <Bleed marginBlock="space-24 space-0">{children}</Bleed>;
};

/**
 * Wrapper innhold og knytter det nærmere visuelt til foregående innhold vha Bleed
 * @children Innholdet
 */
export const QuestionBleedTop = ({ children }: { children: React.ReactNode }) => {
    return <Bleed marginBlock="space-24 space-0">{children}</Bleed>;
};

/**
 * Wrapper innhold og knytter det nærmere visuelt til foregående innhold vha Bleed
 * @children Innholdet
 */
export const QuestionBleedBottom = ({ children }: { children: React.ReactNode }) => {
    return <Bleed marginBlock="space-0 space-16">{children}</Bleed>;
};

/**
 * Questions
 * ----------------
 * Setter opp default spacing mellom innhold
 * gap=8
 */

export const Questions = ({ ...rest }: VStackProps) => {
    return <VStack gap="space-32" {...rest} />;
};

/**
 * Box med bakgrunsfarge og avrundede hjørner
 * @param param0
 * @returns
 */

type PanelProps = { bleedTop?: boolean } & BoxNewProps;

const Panel = ({ bleedTop, ...rest }: PanelProps) => {
    const content = (
        <Box
            borderColor="neutral-subtle"
            background="neutral-soft"
            borderRadius="8"
            borderWidth="1"
            padding={{ xs: 'space-8', sm: 'space-16', md: 'space-24' }}
            {...rest}
        />
    );
    return bleedTop ? <QuestionBleedTop>{content}</QuestionBleedTop> : content;
};

type StepGuideWrapperProps = { children: React.ReactNode } & React.HTMLAttributes<HTMLElement>;

const StepGuideWrapper = ({ children, ...rest }: StepGuideWrapperProps) => {
    return (
        <Box marginBlock="space-0 space-48" {...rest}>
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

interface FormButtonProps {
    back?: {
        label: string;
        onClick: (values: any) => void;
        disabled?: boolean;
    };
    next: {
        label: string;
        onClick: (values: any) => void;
        disabled?: boolean;
        pending?: boolean;
        isFinalSubmit?: boolean;
    };
}

const FormButtons = ({ back, next }: FormButtonProps) => {
    return (
        <HStack gap="space-16" justify="start">
            {back && (
                <Button
                    variant="secondary"
                    type="button"
                    onClick={back.onClick}
                    disabled={back.disabled}
                    icon={<ArrowLeftIcon aria-hidden />}>
                    {back.label}
                </Button>
            )}
            {next && (
                <Button
                    variant="primary"
                    type="submit"
                    loading={next.pending}
                    disabled={next.disabled}
                    iconPosition="right"
                    icon={next.isFinalSubmit ? <PaperplaneIcon aria-hidden /> : <ArrowRightIcon aria-hidden />}>
                    {next.label}
                </Button>
            )}
        </HStack>
    );
};

const Content = ({ children }: { children: React.ReactNode }) => {
    return <VStack gap="space-48">{children}</VStack>;
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
    FormButtons,
    Content,
};
