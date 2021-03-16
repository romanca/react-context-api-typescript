
export const initialLabelState = {
	loading: false,
	data: [] as Label[],
	selectedLabel: null as null | Label,
};

export type TLabelState = typeof initialLabelState

export const labelActions = {
  fetchLabelsStart: () => ({ type: 'FETCH_LABELS_START' }) as const,
  fetchLabelsFinnish: (payload: Label[]) => ({ type: 'FETCH_LABELS_FINNISH', payload }) as const,
  addLabel: (payload: Label) => ({ type: 'ADD_LABEL', payload }) as const,
  removeLabel: (payload: number) => ({ type: 'REMOVE_LABEL', payload }) as const,
  editLabel: (id: number, payload: Partial<Label>) => ({ type: 'EDIT_LABEL', payload, id }) as const,
  setSelectedLabel: (payload: Label) => ({ type: 'SET_SELECTED_LABEL', payload }) as const,
  favoriteLabel: (id:number, payload: Partial<Label>) => ({type: "FAVORITE_LABEL", payload, id}) as const
}

export type TLabelAction = ReturnType<typeof labelActions[keyof typeof labelActions]>

export function labelReducer(state: TLabelState, action: TLabelAction) {
  switch (action.type) {
    case 'FETCH_LABELS_START':
      return {
        ...state,
        loading: true,
      }
    case 'FETCH_LABELS_FINNISH':
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case 'ADD_LABEL':
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    case 'REMOVE_LABEL':
      return {
        ...state,
        data: state.data.filter(i => i.id !== action.payload)
      }
    case 'EDIT_LABEL':
      return {
        ...state,
        data: state.data.map(i => {
          if (i.id === action.id) {
            return {
              ...i,
              ...action.payload
            }
          }
          return i
        })
      }
      case "FAVORITE_LABEL": 
        return{
        ...state,
        data: state.data.map(i => {
          if (i.id === action.id) {
            return{
              ...i,
              ...action.payload
            }
          }
          return i
        })
      }
    case 'SET_SELECTED_LABEL':
      return {
        ...state,
        selectedLabel: action.payload
      }
    default:
      return state
  }
}
