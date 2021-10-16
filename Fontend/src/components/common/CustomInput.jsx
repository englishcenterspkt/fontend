import React, {useState} from "react";
import PropTypes from "prop-types";

CustomInput.propType = {
    onSubmit: PropTypes.func,
}
CustomInput.defaultProps = {
    onSubmit: null,
}

function CustomInput(props) {
    const {onSubmit} = props;
    const [value, setValue] = useState("");
    function handleChange(e) {
        setValue(e.target.value);
        if(!onSubmit) {
            return;
        }
        if (e.charCode === 13) {
            console.log(value);
            const formValues = {
                value,
            };
            onSubmit(formValues);
        }
    }

    return (
        <form>
            <input
                type="text"
                value={value}
                onChange={handleChange}
            />
        </form>
    )
}

export default CustomInput;