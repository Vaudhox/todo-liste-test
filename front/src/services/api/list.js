import axiosInstance from '../axiosInstance';

export async function getAllMyList() {
    const response = await axiosInstance.get('/lists');
    return response.data
}

export async function getTasksByList(params) {
    const response = await axiosInstance.get('/' + params.listId + '/tasks');
    return response.data
}

export async function addList(params) {
    const response = await axiosInstance.post('/lists', params);
    return response.data
}

export async function updateList(params) {
    const response = await axiosInstance.put('/lists/' + params.listId, {title: params.title, endDate: params.endDate});
    return response.data
}

export async function deleteList(params) {
    const response = await axiosInstance.delete('/lists/' + params.listId);
    return response.data
}

export async function updateTask(params) {
    const response = await axiosInstance.put('/' + params.listId + '/tasks/' + params.taskId, {text: params.text, status: params.status});
    return response.data
}

export async function deleteTask(params) {
    const response = await axiosInstance.delete('/' + params.listId + '/tasks/' + params.taskId);
    return response.data
}

export async function addTask(params) {
    const response = await axiosInstance.post('/' + params.listId + '/tasks', {text: params.text, status: params.status});
    return response.data
}
