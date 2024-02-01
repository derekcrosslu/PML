export const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        //   borderBottom: '1px dotted pink',
        //   color: state.isSelected ? 'red' : 'blue',
        //   padding: 20,
        fontSize: "12px",
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        // none of react-select's styles are passed to <Control />
        // width: 200,
    }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";

        return { ...provided, opacity, transition };
    },
    indicatorSeparator: () => ({
        // ...provided,
    }),
    input: (provided: any, state: any) => ({
        ...provided,
    }),
    container: (provided: any, state: any) => ({
        ...provided,
        width: "220px",
        fontSize: "12px",
    }),
    dropdownIndicator: (provided: any, state: any) => ({
        color: "black",
        marginRight: "5px",
    }),
    placeholder: (provided: any, state: any) => ({
        ...provided,
        color: "gray",
        fontSize: "12px",
    }),
    valueContainer: (provided: any, state: any) => ({
        ...provided,
        // backgroundColor: 'orange',
        // height: '15px',
    }),
};
