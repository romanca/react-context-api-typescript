import   {   useReducer, useMemo } from 'react';
import {
	todoReducer,
	initialTodoState,
	todoActions,
} from '../Reducers';

import {
	getTodos,
	createTodo as createTodoApi,
	removeTodo as removeTodoApi,
	editTodo as editTodoApi,
	completeTodo as completeTodoApi,
} from '../Api/index';
import { useError } from './useError';
import { useTodoContext } from '../Providers/TodoProvider';

const dispatchEnhancer = (dispatch: any) => (...args: any[]) => {
	dispatch(...args)
}

export const useTodos = () => {
	const setError = useError()
	const [rawState, dispatchRaw] = useReducer(todoReducer, initialTodoState);

	const dispatch = dispatchEnhancer(dispatchRaw)

	const state = useMemo(() => ({
		todoList: rawState.data.filter(i => !i.deleted) ,
		loading: rawState.loading,
	}), [rawState])


	const actions = {
    fetchTodos: async () => {
			dispatch(todoActions.fetchTodosStart());
			try {
				const payload = await getTodos();
				dispatch(todoActions.fetchTodosFinnish(payload));
			} catch (err) {
				setError(err)
			}
		},
		addTodo: async (payload: Omit<Todo, 'id'>) => {
			const id = Date.now()
			try {
				dispatch(todoActions.addTodo({ ...payload, id }))
				const response = await createTodoApi(payload);
				dispatch(todoActions.editTodo(id, response))
			} catch (err) {
				dispatch(todoActions.removeTodo(id))
				setError(err)
			}
		},
		editTodo: async (payload: Partial<Todo> & { id: number }) => {
			const id = payload.id
            const originalValue = rawState.data.find(i => i.id === id)
      if (!originalValue) {
        return
      }
			try {
				dispatch(todoActions.editTodo(id, payload))
				const response = await editTodoApi({ ...payload });
				dispatch(todoActions.editTodo(id, response))
			} catch (err) {
				dispatch(todoActions.editTodo(id, originalValue))
				setError(err)
			}
		},
		removeTodo: async (payload: number) => {
			dispatch(todoActions.editTodo(payload, { deleted: true }))
			try {
				await removeTodoApi(payload);
				dispatch(todoActions.removeTodo(payload))
			} catch (err) {
				dispatch(todoActions.editTodo(payload, { deleted: false }))
				setError(err)
			}
		},
			 
		completeTodo: async (payload: Partial<Todo> & { id: number }) => {
			const id = payload.id
            const originalValue = rawState.data.find(i => i.id === id)
      if (!originalValue) {
        return
      }
			try {
				dispatch(todoActions.editTodo(id, payload))
				const response = await completeTodoApi({ ...payload });
				dispatch(todoActions.editTodo(id, response))
			} catch (err) {
				dispatch(todoActions.editTodo(id, originalValue))
				setError(err)
			}
		},
	
  }
	return [state, actions] as const;
};
 

export const useTodoActions = () => {
	const { todoActions } = useTodoContext();
	return todoActions
};

export const useTodoState = () => {
	const {todoState} = useTodoContext();
	return todoState
};
 
 

