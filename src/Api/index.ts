import { getLsItem, updateLsItem } from '../shared/localStorage';



const TODOS_LS_KEY = 'TODOS_LS_KEY'

export function getTodos(): Promise<Todo[]> {
    const todos = getLsItem(TODOS_LS_KEY, [])
    return Promise.resolve(todos)
}
export function getLabels(): Promise<Label[]> {
    const labels = getLsItem(TODOS_LS_KEY, [])
    return Promise.resolve(labels)
}

export function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const newTodo = {
        ...todo,
        id: Date.now()
    }
    updateLsItem(TODOS_LS_KEY, (current) => {
            return [...current, newTodo]
    }, [])
    return Promise.resolve(newTodo)
}
export function createLabel(label:Omit<Label, 'id'>): Promise<Label> {
    const newLabel = {
        ...label,
        id: Date.now()
    }
    updateLsItem(TODOS_LS_KEY, current => {
        return [...current, newLabel]
    }, [])
    return Promise.resolve(newLabel)
}
export function removeLabel(id: number): Promise<number> {
    updateLsItem(TODOS_LS_KEY, current => {
       return current.filter((label: Label) => label.id !== id)
    }, [])
    return Promise.resolve(id)
}
export function editLabel(label:Label): Promise<Label> {
    updateLsItem(TODOS_LS_KEY, current => {
        return current.map((i) => {
            if (i.id === label.id) {
                return label;
            }
        }, []),
    })
}

export function editTodo(todo: Todo): Promise<Todo> {

    updateLsItem(TODOS_LS_KEY, (current) => {
        return current.map((i: Todo) => i.id === todo.id ? todo : i)
    }, [])
    return Promise.resolve(todo)
}