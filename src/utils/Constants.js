const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/';

export default apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
