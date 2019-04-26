import { connect } from 'react-redux'
import { UnwrapDAI } from '../components/buttons/unwrapDAI.js'
import { WrapDAI } from '../components/buttons/wrapDAI.js'
import { wrapDAIContractCall, unwrapDAIContractCall } from '../reducers/contractReducerDAI.js'
import { ButtonStates, handleInputValueChange } from '../reducers/buttonsReducer.js'

const mapStateToPropsWrapDAI = (state) => ({
  buttonState : state.ButtonsReducer.wrapDAI,
 })

 const mapStateToPropsUnwrapDAI = (state) => ({
   buttonState : state.ButtonsReducer.unwrapDAI,
  })

const mapDispatchToPropsWrapDAI = (dispatch) => ({
  wrapDAI: (amountInDAI) => {
    dispatch(wrapDAIContractCall(amountInDAI)) // <--- TODO: insert values
  },
  handleInputValueChange: (button, newVal) => {
    dispatch(handleInputValueChange(button, newVal))
  }
})

const mapDispatchToPropsUnwrapDAI = (dispatch) => ({
  unwrapDAI: (amountInDAI) => {
    dispatch(unwrapDAIContractCall(amountInDAI))
  },
  handleInputValueChange: (button, newVal) => {
    dispatch(handleInputValueChange(button, newVal))
  }
})

export const WrapDAIContainer = connect(mapStateToPropsWrapDAI,mapDispatchToPropsWrapDAI)(WrapDAI)
export const UnwrapDAIContainer = connect(mapStateToPropsUnwrapDAI,mapDispatchToPropsUnwrapDAI)(UnwrapDAI)
