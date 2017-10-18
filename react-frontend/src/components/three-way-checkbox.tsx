import * as React from 'react'

import { CheckboxProps } from 'material-ui'
import Checkbox from 'material-ui/Checkbox'
import CheckboxTrueIcon from 'material-ui/svg-icons/toggle/check-box'
import CheckboxFalseIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import CheckboxNullIcon from 'material-ui/svg-icons/toggle/indeterminate-check-box'
import { Omit } from '../type-diff'

const nextValue = (value: boolean | null) => {
    switch (value) {
        case false: return null
        case true: return false
        default: return true
    }
}

const ValueIcon = ({ value }: { value: boolean | null }) => {
    switch (value) {
        case true:
            return <CheckboxTrueIcon />
        case false:
            return <CheckboxFalseIcon />
        default:
            return <CheckboxNullIcon />
    }
}

interface ThreeWayCheckboxOwnProps {
    value: boolean | null
    onChange?: (newValue: boolean | null) => any
}

type ThreeWayCheckboxProps = ThreeWayCheckboxOwnProps & Omit<CheckboxProps, 'value' | 'onChange'>

const ThreeWayCheckbox = ({ value, onChange, ...rest }: ThreeWayCheckboxProps) => (
    <Checkbox
        checked={false}
        checkedIcon={<ValueIcon value={value} />}
        onCheck={() => onChange && onChange(nextValue(value))}
        {...rest}
    />
)

export default ThreeWayCheckbox