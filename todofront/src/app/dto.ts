export type Todo = {
    id: number;
    text: string;
    isCompleted: boolean;
};

export type Category = {
    id: number;
    title: string;
    todos: Todo[];
}
