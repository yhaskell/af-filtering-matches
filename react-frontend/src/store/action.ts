import { Action as ReduxAction } from 'redux'
export interface Action<K, T> extends ReduxAction {
    type: K
    payload: T
}