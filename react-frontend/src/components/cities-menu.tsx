import * as React from 'react'
import { connect } from 'react-redux'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MyLocationIcon from 'material-ui/svg-icons/maps/my-location'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

import { State } from '../store/reducers'
import { City } from '../store/reducers/location'
import * as actions from '../store/actions'

interface Props {
    current: City
    locations: City[]
    setLocation(location: City): any
}

const CitiesMenu = ({ current, locations, setLocation }: Props) => (
    <IconMenu

        iconButtonElement={
            <IconButton><NavigationMenu color="white" /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem
            primaryText="Switch to Angular frontend"
            onClick={() => { document.location.href = '/' }}
        />
        <MenuItem
            primaryText={current ? `Current city: ${current.name}` : `Select city`}
            rightIcon={<ArrowDropRight />}
            menuItems={locations.map(
                location => (
                    <MenuItem
                        key={location.name}
                        primaryText={location.name}
                        rightIcon={location === current ? <MyLocationIcon /> : undefined}
                        onClick={() => setLocation(location)}
                    />
                ))}
        />
    </IconMenu>
)

export default connect(
    ({ location, locations }: State) => ({ current: location, locations }),
    { setLocation: actions.setLocation }
)(CitiesMenu)