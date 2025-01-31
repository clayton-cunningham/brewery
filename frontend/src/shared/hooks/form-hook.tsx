import { Reducer, useCallback, useReducer } from 'react';

type State = { value: string, isValid: boolean };
type Inputs = {[key: string] : State};
type Action = { inputId: string, type: string, inputs: Inputs, formIsValid: boolean }

const formReducer = (state: {inputs: Inputs}, action: State & Action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      return state;
  }
};

/**
 * Manages values within the children components
 */
export const useForm = (initialInputs: Inputs, initialFormValidity: boolean) => {
  const [formState, dispatch] = useReducer<Reducer<any, any>>(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  const inputHandler = useCallback((id: string, value: any, isValid: boolean) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const setFormData = useCallback((inputData: Inputs, formValidity: boolean) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
};