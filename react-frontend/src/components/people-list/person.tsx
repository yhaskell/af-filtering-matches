import * as React from 'react'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

import { Person } from '../../data/person'

export default ({ person }: { person: Person }) => {
    const avatar = <Avatar icon={<img src={person.main_photo || 'person.svg'} />} />

    return (
        <ListItem
            style={{ display: 'table-cell', width: '33%' }}
            className="list-item"
            leftAvatar={avatar}
            primaryText={`${person.display_name}, ${person.age}`}
            secondaryText={`${person.job_title} @ ${person.city.name}`}
        />
    )
}
