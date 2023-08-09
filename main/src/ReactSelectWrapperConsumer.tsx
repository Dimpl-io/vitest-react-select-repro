import { useState } from "react";
import ReactSelectWrapper, { IOption } from "../../lib/src/ReactSelectWrapper";

const Options: IOption<string>[] = [
    { label: 'a', value: 'a'},
    { label: 'b', value: 'b'}
];

const ReactSelectWrapperConsumer = () => {
    const [selectedOption, setSelectedOption] = useState(Options[0]);

    return (
        <ReactSelectWrapper options={Options}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}/>
    )
};

export default ReactSelectWrapperConsumer;
