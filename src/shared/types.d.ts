interface Todo {
	text: string
	description: string
	complete?: boolean
	id: nubmer
	categoryId: number
	priority: string
	date: Date
	deleted?: boolean
}
interface Label {
	title: string
	id: number
	deleted?: boolean
}

interface Category {
	title: string
	id: number
}
 
 
 
   
 