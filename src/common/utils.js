/* eslint-disable */

const validElementProps = {
    autoComplete: true,
    id: true,
    name: true,
    className: true,
    onChange: true,
    onBlur: true,
    onFocus: true,
    onClick: true,
    placeholder: true,
    defaultValue: true,
    value: true,
    readonly: true,
    disabled: true,
    checked: true,
    pattern: true,
    tabIndex: true,
    required: true,
};

export function validDOMProps(props) {
    const newProps = {};

    for (const prop in props) {
        if (validElementProps[prop] || prop.substring(0, 5) === 'aria-') {
            newProps[prop] = props[prop];
        }
    }

    return newProps;
}
