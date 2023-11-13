export type Empty = {
    readonly _tag: 'Empty';
};

export type NoValidChildrenOrange = {
    readonly _tag: 'NoValidChildrenOrange';
};
export type ResultBox<A> = {
    readonly _tag: 'ResultBox';
    readonly result: A;
};

export type ResultView<A> = Empty | NoValidChildrenOrange | ResultBox<A>;

// constructors
export const empty: ResultView<never> = {
    _tag: 'Empty',
};

export const noValidChildrenOrange: ResultView<never> = {
    _tag: 'NoValidChildrenOrange',
};
export const resultBox = <A>(result: A): ResultView<A> => ({
    _tag: 'ResultBox',
    result,
});
// filters
export const isEmpty = (data: ResultView<unknown>): data is Empty => data._tag === 'Empty';
export const isNoValidChildrenOrange = (data: ResultView<unknown>): data is NoValidChildrenOrange =>
    data._tag === 'NoValidChildrenOrange';
export const isResultBox = <A>(data: ResultView<A>): data is ResultBox<A> => data._tag === 'ResultBox';

// fold
export const caseResultViewOf =
    <A, B>(empty: () => B, noValidChildrenOrange: () => B, resultBox: (result: A) => B) =>
    (resultView: ResultView<A>): B => {
        switch (resultView._tag) {
            case 'Empty': {
                return empty();
            }
            case 'NoValidChildrenOrange': {
                return noValidChildrenOrange();
            }
            case 'ResultBox': {
                return resultBox(resultView.result);
            }
        }
    };
