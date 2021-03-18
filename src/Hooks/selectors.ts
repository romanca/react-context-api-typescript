import { useLabelState } from "./useLabels"
import { useTodoState  } from './useTodos';

export const useTodosBySelectedLabel = () => {
  const { selectedLabel } = useLabelState()
  const { todoList } = useTodoState()
  if (!selectedLabel) {
    return []
  } 
  return todoList.filter((i) => i.categoryId === selectedLabel.id) 
}

 

 


 

 
 
 
 