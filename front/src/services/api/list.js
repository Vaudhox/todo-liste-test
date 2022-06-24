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
