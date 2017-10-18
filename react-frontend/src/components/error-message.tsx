import * as React from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

import { State } from '../store/reducers'

const ErrorMessage = ({ error, onClose }: { error: string; onClose(): any }) => (
    <Snackbar 
        open={error != null}
        message={error || ''}
        autoHideDuration={3000}
        onRequestClose={onClose} 
    />
)

export default connect(
    (state: State) => ({ error: state.error}),
    {
        onClose: () => ({ type: 'CLEAR_ERROR' })
    }
)(ErrorMessage)
