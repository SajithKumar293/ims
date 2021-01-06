export default function authHeader() {
    const user = JSON.parse(window.localStorage.getItem('authData'));
  
    if (user && user.data) {
      return { 'x-access-token': user.data };
    } else {
      return {};
    }
  }