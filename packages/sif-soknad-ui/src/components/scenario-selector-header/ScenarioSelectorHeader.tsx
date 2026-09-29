import { PersonCircleIcon } from '@navikt/aksel-icons';
import { ActionMenu, InternalHeader, Spacer } from '@navikt/ds-react';
import { Fragment } from 'react';

export interface ScenarioSelectorHeaderOption<T extends string = string> {
    label: string;
    value: T;
}

export interface ScenarioSelectorHeaderGroup<T extends string = string> {
    label?: string;
    options: Array<ScenarioSelectorHeaderOption<T>>;
}

interface BaseProps {
    title: string;
    isGitHubPages?: boolean;
}

interface TitleOnlyProps extends BaseProps {
    buttonLabel?: never;
    activeScenario?: never;
    groups?: never;
    onSelectScenario?: never;
}

interface SelectableProps<T extends string> extends BaseProps {
    buttonLabel?: string;
    activeScenario: T;
    groups: Array<ScenarioSelectorHeaderGroup<T>>;
    onSelectScenario: (value: T) => void;
}

type Props<T extends string = string> = TitleOnlyProps | SelectableProps<T>;

export const ScenarioSelectorHeader = <T extends string = string>(props: Props<T>) => {
    const { title, isGitHubPages } = props;

    return (
        <InternalHeader>
            {isGitHubPages && (
                <InternalHeader.Button
                    onClick={() => (window.location.href = 'https://navikt.github.io/sif-brukerdialog/')}>
                    SIF
                </InternalHeader.Button>
            )}
            <InternalHeader.Title>{title}</InternalHeader.Title>
            <Spacer />

            {props.groups !== undefined && <ScenarioMenu {...props} />}
        </InternalHeader>
    );
};

const ScenarioMenu = <T extends string>({
    buttonLabel = 'Velg scenario',
    activeScenario,
    groups,
    onSelectScenario,
}: SelectableProps<T>) => {
    const visibleGroups = groups.filter((group) => group.options.length > 0);

    if (visibleGroups.length === 0) {
        return null;
    }

    const activeLabel = groups.flatMap((g) => g.options).find((o) => o.value === activeScenario)?.label;

    return (
        <ActionMenu>
            <ActionMenu.Trigger>
                <InternalHeader.Button>
                    <PersonCircleIcon fontSize="1.5rem" aria-hidden={true} />
                    {buttonLabel} ({activeLabel})
                </InternalHeader.Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                {visibleGroups.map((group, groupIndex) => (
                    <Fragment key={group.label ?? `group-${groupIndex}`}>
                        {group.label ? (
                            <ActionMenu.Group label={group.label}>
                                {group.options.map((option) => (
                                    <ActionMenu.Item key={option.value} onSelect={() => onSelectScenario(option.value)}>
                                        {option.label}
                                    </ActionMenu.Item>
                                ))}
                            </ActionMenu.Group>
                        ) : (
                            group.options.map((option) => (
                                <ActionMenu.Item key={option.value} onSelect={() => onSelectScenario(option.value)}>
                                    {option.label}
                                </ActionMenu.Item>
                            ))
                        )}
                        {groupIndex < visibleGroups.length - 1 ? <ActionMenu.Divider /> : null}
                    </Fragment>
                ))}
            </ActionMenu.Content>
        </ActionMenu>
    );
};
