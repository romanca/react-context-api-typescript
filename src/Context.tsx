import { createContext } from 'react';
import { IContext } from './TodoProvider';

const Context = createContext<IContext | null>(null);
export default Context;
