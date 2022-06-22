import Store from '../../redux/store';
import { setLogin } from '../../redux/user/userSlice.js';
import axiosInstance from '../axiosInstance';

export async function getAllMyList() {
    const response = await axiosInstance.get('/lists');
    return response.data
}

