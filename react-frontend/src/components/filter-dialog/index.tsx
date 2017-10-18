import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'

import Slider from 'material-ui/Slider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FilterIcon from 'material-ui/svg-icons/content/filter-list'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import ThreeWayCheckbox from '../three-way-checkbox'

import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

import './index.css'

import { State } from '../../store/reducers'
import { MatchFilter } from '../../data/person'

import * as actions from '../../store/actions'

interface Filter {
    filter: MatchFilter
}
interface Props extends Filter {
    filterPeople(filter: MatchFilter): any
}

class DialogView extends Component<Props, Filter & { open: boolean }> {
    constructor(props: Props) {
        super(props)
        this.state = {
            open: false,
            filter: props.filter
        }
    }

    componentWillReceiveProps({ filter }: { filter: MatchFilter }) {
        this.setState({ filter })
    }
    onClose = () => {
        this.setState({ open: false })
        this.props.filterPeople(this.state.filter)
    }
    onOpen = () => this.setState({ open: true })

    setBoolean = (key: string, value: boolean | null) => {
        this.setState(state => ({
            filter: {
                ...state.filter,
                [key]: value
            }
        }))
    }

    setCompatibilityScore = ([from, to]: [number, number]) => {
        this.setState(state => ({
            filter: {
                ...state.filter,
                compatibility_score: { from, to }
            }
        }))
    }

    setAge = ([from, to]: [number, number]) => {
        this.setState(state => ({
            filter: {
                ...state.filter,
                age: { from, to: (to === 100 ? null : to) }
            }
        }))
    }
    setHeight = ([from, to]: [number, number]) => {
        this.setState(state => ({
            filter: {
                ...state.filter,
                height: { from, to: (to === 211 ? null : to) }
            }
        }))
    }

    setDistance = (distance: number) => {
        this.setState(state => ({
            filter: {
                ...state.filter,
                distance: (distance === 301 ? null : distance)
            }
        }))
    }
    render() {
        const { filter } = this.state
        const compatibilityScore: number[] = [filter.compatibility_score.from || 1, filter.compatibility_score.to || 99]
        const age: number[] = [filter.age.from || 18, filter.age.to || 100]
        const height: number[] = [filter.height.from || 135, filter.height.to || 211]
        
        const submit = (
            <FlatButton
                key="submit"
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.onClose}
            />
        )

        return (
            <div>
                <div className="bottom-right-corner">
                    <FloatingActionButton onClick={this.onOpen}>
                        <FilterIcon />
                    </FloatingActionButton>
                </div>
                <Dialog
                    title="Filter matches"
                    actions={[submit]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.onClose}
                >
                    <div className="dialog-view dialog-view__flags">
                        <div className="dialog-view dialog-view__flag">
                            <ThreeWayCheckbox
                                label="Has photo"
                                value={filter.has_photo}
                                onChange={nv => this.setBoolean('has_photo', nv)}
                            />
                        </div>
                        <div className="dialog-view dialog-view__flag">
                            <ThreeWayCheckbox
                                label="In contact"
                                value={filter.in_contact}
                                onChange={nv => this.setBoolean('in_contact', nv)}
                            />
                        </div>
                        <div className="dialog-view dialog-view__flag">
                            <ThreeWayCheckbox
                                label="Favourite"
                                value={filter.is_favourite}
                                onChange={nv => this.setBoolean('is_favourite', nv)}
                            />
                        </div>
                    </div>
                    <div className="dialog-view dialog-view__range">
                        <label>
                            Compatibility score: {filter.compatibility_score.from}% to {filter.compatibility_score.to}%
                        </label>
                        <Range 
                            allowCross={false} 
                            value={compatibilityScore} 
                            onChange={this.setCompatibilityScore} 
                            min={1} 
                            max={99}
                        />
                    </div>
                    <div className="dialog-view dialog-view__range">
                        <label>
                            Age: {filter.age.from}
                            {filter.age.to && filter.age.to < 100 
                                ? <span> to {filter.age.to} </span> 
                                : '+ '}
                            years old
                        </label>
                        <Range 
                            allowCross={false} 
                            value={age} 
                            onChange={this.setAge}
                            min={18} 
                            max={100} 
                        />
                    </div>
                    <div className="dialog-view dialog-view__range">
                        <label>
                            Height: {filter.height.from}
                            {filter.height.to && filter.height.to < 211
                                ? <span> to {filter.height.to} </span> 
                                : '+ '}
                            cm
                        </label>
                        <Range 
                            allowCross={false} 
                            value={height} 
                            onChange={this.setHeight}
                            min={135} 
                            max={211} 
                        />
                    </div>
                    <div className="dialog-view dialog-view__range">
                        <label>
                            Distance: {filter.distance || '300+'} km
                        </label>
                        <Slider 
                            value={filter.distance || 301} 
                            onChange={(_, nv) => this.setDistance(nv)}
                            min={30} 
                            max={301} 
                            step={1}
                        />
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default connect(
    (state: State) => ({ filter: state.filter }),
    { filterPeople: actions.filterPeople }
)(DialogView)