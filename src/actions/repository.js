import axios from 'axios';

const BASE_URL = 'http://localhost:5000';


export function getItems(data) {
    return axios.get(`${BASE_URL}/api/item/all`,
    {headers: {Authorization: 'Bearer '+data}}
    ).then(response => response.data)
}

export function getCartProducts(data,cart) {
    return axios.post(`${BASE_URL}/api/item/cart`, {headers: {Authorization: 'Bearer '+data},cart:cart})
            .then(response => response.data);
}

export function createBorrowRequest(data,userID,products,lab,advisor) {
    return axios.post(`${BASE_URL}/api/borrow/create`, {
        headers: {Authorization: 'Bearer '+data},
        userId:userID,
        labName:lab,
        products:products,
        dueDate:Date()})
            .then(response => response.data);
}

export function getMyItems(data,userID){
    return axios.post(`${BASE_URL}/api/borrow/user`, {headers: {Authorization: 'Bearer '+data},id:userID})
            .then(response => response.data);
}

export function getAllRequests(data,lab){
    return axios.post(`${BASE_URL}/api/borrow/lab`, {headers: {Authorization: 'Bearer '+data},labName:lab})
            .then(response => response.data);
}
