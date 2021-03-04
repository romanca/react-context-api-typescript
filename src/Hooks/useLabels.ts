import {  useReducer, useMemo } from 'react';
import {
	labelReducer,
	initialLabelState,
    labelActions,
} from '../Reducers';

import {
	getLabels,
	createLabel as createLabelApi,
	removeLabel as removeLabelApi,
	editLabel as editLabelApi,
} from '../Api/index';
import { useError } from './useError';
import { useTodoContext } from '../Providers/TodoProvider';

export const useLabels = () => {
	const setError = useError()
	const [rawState, dispatch] = useReducer(labelReducer, initialLabelState);

	const state = useMemo(() => ({
		labels: rawState.data.filter(i => !i.deleted),
		loading: rawState.loading,
        selectedLabel: rawState.selectedLabel
	}), [rawState.data, rawState.loading, rawState.selectedLabel])


	const actions = {
    fetchLabels: async () => {
			dispatch(labelActions.fetchLabelsStart());
			try {
				const payload = await getLabels();
				dispatch(labelActions.fetchLabelsFinnish(payload));
			} catch (err) {
				setError(err)
			}
		},
		addLabel: async (payload: Omit<Label, 'id'>) => {
			const id = Date.now()
			try {
				dispatch(labelActions.addLabel({ ...payload, id }))
				const response = await createLabelApi(payload);
				dispatch(labelActions.editLabel(id, response))
			} catch (err) {
				dispatch(labelActions.removeLabel(id))
				setError(err)
			}
		},
		editLabel: async (payload: Partial<Label> & { id: number }) => {
			const id = payload.id
      const originalLabel = rawState.data.find(i => i.id === id)
      if (!originalLabel) {
        return
      }
			try {
				dispatch(labelActions.editLabel(id, payload))
				const response = await editLabelApi({ ...payload });
				dispatch(labelActions.editLabel(id, response))
			} catch (err) {
				dispatch(labelActions.editLabel(id, originalLabel))
				setError(err)
			}
		},
		removeLabel: async (payload: number) => {
			dispatch(labelActions.editLabel(payload, { deleted: true }))
			try {
				await removeLabelApi(payload);
				dispatch(labelActions.removeLabel(payload))
			} catch (err) {
				dispatch(labelActions.editLabel(payload, { deleted: false }))
				setError(err)
			}
		},
		setSelectedLabel: (payload: Label) => {
			dispatch(labelActions.setSelectedLabel(payload))
		}
  }

	return [state, actions] as const;
};
export const useLabelActions = () => {
	const {labelActions} = useTodoContext();
	return labelActions
};

export const useLabelState = () => {
	const {labelState} = useTodoContext();
	return labelState
};