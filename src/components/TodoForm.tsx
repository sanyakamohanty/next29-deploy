'use client';

import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

interface TodoItem {
  title: string;
  description: string;
  completedOn?: string;
}

const Todo: React.FC = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState<TodoItem[]>([]); // Explicitly type the useState hook
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([]); // Explicitly type the useState hook
  const [currentEdit, setCurrentEdit] = useState<number | null>(null);
  const [currentEditedItem, setCurrentEditedItem] = useState<TodoItem | null>(null);

  const handleAddTodo = () => {
    const newTodoItem: TodoItem = { title: newTitle, description: newDescription };

    const isDuplicate = allTodos.some(
      todo => todo.title === newTodoItem.title && todo.description === newTodoItem.description
    );

    if (isDuplicate) {
      alert('Task already exists');
      return;
    }

    const updatedTodoArr = [...allTodos, newTodoItem];
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    handleReset();
  };

  const handleReset = () => {
    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTodo = (index: number) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index: number) => {
    const now = new Date();
    const completedOn = now.toLocaleString();

    const filteredItem = { ...allTodos[index], completedOn };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index: number) => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem('todolist') || '[]');
    const savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos') || '[]');
    setTodos(savedTodo);
    setCompletedTodos(savedCompletedTodo);
  }, []);

  const handleEdit = (index: number, item: TodoItem) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value: string) => {
    if (currentEditedItem) {
      setCurrentEditedItem({ ...currentEditedItem, title: value });
    }
  };

  const handleUpdateDescription = (value: string) => {
    if (currentEditedItem) {
      setCurrentEditedItem({ ...currentEditedItem, description: value });
    }
  };

  const handleUpdateToDo = () => {
    if (currentEdit !== null && currentEditedItem) {
      const newToDo = [...allTodos];
      newToDo[currentEdit] = currentEditedItem;
      setTodos(newToDo);
      setCurrentEdit(null);
      setCurrentEditedItem(null);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold my-4">My Todos</h1>
      <div className="bg-gray-700 p-6 w-full max-w-xl rounded-lg shadow-lg overflow-y-auto">
        <div className="mb-4">
          <div className="mb-2">
            <label className="block font-bold mb-1">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleAddTodo}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${!isCompleteScreen ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`px-4 py-2 rounded ${isCompleteScreen ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="space-y-4">
          {!isCompleteScreen &&
            allTodos.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="bg-gray-800 p-4 rounded flex flex-col space-y-2" key={index}>
                    <input
                      placeholder="Updated Title"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem?.title || ''}
                      className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Updated Description"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem?.description || ''}
                      className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleUpdateToDo}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="bg-gray-800 p-4 rounded flex justify-between items-center" key={index}>
                    <div>
                      <h3 className="text-xl font-bold text-green-500">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <AiOutlineDelete
                        className="text-red-500 cursor-pointer"
                        size={24}
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="text-green-500 cursor-pointer"
                        size={20}
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      />
                      <AiOutlineEdit
                        className="text-blue-500 cursor-pointer"
                        size={24}
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      />
                    </div>
                  </div>
                );
              }
            })
          }
          {isCompleteScreen &&
            completedTodos.map((item, index) => (
              <div className="bg-gray-800 p-4 rounded flex justify-between items-center" key={index}>
                <div>
                  <h3 className="text-xl font-bold text-green-500">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                  <p className="text-gray-500 text-sm">Completed on: {item.completedOn}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="text-red-500 cursor-pointer"
                    size={24}
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete?"
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Todo;

