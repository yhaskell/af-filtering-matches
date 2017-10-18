import { State } from '../../store/reducers'
import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import List from 'material-ui/List'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import PersonView from './person'
import { Person } from '../../data/person'
import * as actions from '../../store/actions'

import './index.css'

interface PeopleListProps {
    people: Person[]
    getPeople(): any
}

const Fade = ({ children, ...props }: any) => (
    <CSSTransition
        {...props}
        timeout={300}
        classNames="fade"
    >
        {children}
    </CSSTransition>
)

class PeopleList extends Component<PeopleListProps, {}> {
    constructor(props: PeopleListProps) {
        super(props)
    }
    componentDidMount() {
        this.props.getPeople()
    }

    render() {
        return (
            <List>
                <TransitionGroup className="people-list">
                    {/* <div className="people-list"> */}
                    {this.props.people.map(person => <Fade key={person._id}><PersonView person={person} /></Fade>)}
                </TransitionGroup>
            </List>
        )
    }
}

export default connect(
    (state: State) => ({ people: state.people }),
    { getPeople: actions.getPeople }
)(PeopleList)
