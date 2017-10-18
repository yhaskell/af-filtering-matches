import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import * as colours from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: colours.blueGrey500,
        primary2Color: colours.blueGrey700,
        primary3Color: colours.blueGrey400,
        accent1Color: colours.grey200,
        accent2Color: colours.grey100,
        accent3Color: colours.grey500,
        textColor: colours.darkBlack,
        alternateTextColor: colours.white,
        canvasColor: colours.white,
        borderColor: colours.grey300,
        disabledColor: fade(colours.darkBlack, 0.3),
        pickerHeaderColor: colours.blueGrey500,
        clockCircleColor: fade(colours.darkBlack, 0.07),
        shadowColor: colours.fullBlack,

    },
})

export default ({ children }: JSX.ElementChildrenAttribute) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        {children}
    </MuiThemeProvider>
)