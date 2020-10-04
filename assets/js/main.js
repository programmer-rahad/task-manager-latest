! function () {
    // Selector Function
    const $ = (selector, areAll) => areAll ? document.querySelectorAll(selector) : document.querySelector(selector);

    // Variables
    const taskInputField = $('#task-manager input[type=text]');
    const taskInputFilter = $('#taskInputFilter');
    const taskManagerForm = $('#task-manager form');
    const collection = $('#task-manager .collection');
    const clearAllBtn = $('.clear-all');
    let taskItem = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    // Function: Render Task Item
    const renderTaskItem = () => {
        collection.innerHTML = '';
        taskItem.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'collection-item line-through' : 'collection-item';
            li.innerHTML = `${task.content}<div class="secondary-content">
                        <i class="material-icons">clear</i>
                    </div>
                `;
            collection.append(li);
        });
        $('#task-manager .card-action').style.display = !collection.innerHTML ? 'none' : 'block';
    }

    // Function: toggleTodo
    const toggleTodo = (e) => {
        let newArr = [];
        taskItem.forEach((task, index) => {
            if (task.content === e.target.firstChild.nodeValue) {
                newArr.push({
                    content: task.content,
                    completed: !task.completed
                });
            } else {
                newArr.push(task)
            }
        });
        taskItem = newArr;
        localStorage.setItem('tasks', JSON.stringify(taskItem));
        renderTaskItem();
    }

    // Function: Filter Task Item
    const filterTaskItem = (e) => {
        Array.from(collection.children).forEach(li => {
            if (li.firstChild.nodeValue.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) === -1) {
                li.style.display = 'none';
            } else {
                li.style.display = 'block';
            }
        });
    }

    // Delete one by one
    const deleteItem = (e) => {
        if (e.target.nodeName === 'I' && confirm('Are you sure ?')) {
            taskItem.forEach((task, index) => {
                if (task.content === e.target.parentElement.parentElement.firstChild.textContent) {
                    taskItem.splice(index, 1);
                }
            });
            localStorage.setItem('tasks', JSON.stringify(taskItem));
            renderTaskItem();
        }
    }

    // Function removeAll
    const removeAll = () => {
        if (confirm('Are you sure?')) {
            taskItem = [];
            localStorage.setItem('tasks', JSON.stringify([]));
            renderTaskItem();
        }
    }

    // Function: addToStorageAndRender
    const addToStorageAndRender = () => {
        if (taskInputField.value.trim()) {
            const newTask = {
                content: taskInputField.value.trim(),
                completed: false
            }
            taskItem.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(taskItem))
            renderTaskItem();
            taskInputField.value = '';
        } else {
            alert('please write something');
        }
        event.preventDefault();
    }

    // Load All Event Listeners
    const allEventListeners = () => {
        document.addEventListener('DOMContentLoaded', renderTaskItem);
        taskManagerForm.addEventListener('submit', addToStorageAndRender);
        collection.addEventListener('click', toggleTodo);
        taskInputFilter.addEventListener('keyup', filterTaskItem);
        collection.addEventListener('click', deleteItem);
        clearAllBtn.addEventListener('click', removeAll);
    }

    // Function call: Load All Event Listeners
    allEventListeners();
}();