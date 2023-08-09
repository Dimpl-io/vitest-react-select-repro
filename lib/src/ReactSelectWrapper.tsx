import Select from 'react-select';

export interface IOption<T> {
    label: string;
    value: T;
}

const ReactSelectWrapper = <T,>(
    {
        options,
        selectedOption,
        setSelectedOption
    }: {
        options: IOption<T>[];
        selectedOption: IOption<T>;
        setSelectedOption: (newOption: IOption<T>) => void;
    }
) => {
    return (
        <Select<IOption<T>> options={options}
                            value={selectedOption}
                            onChange={setSelectedOption}/>
    );
};

export default ReactSelectWrapper;
