import axios from 'axios';

export const fetchCurrentUser = async () => {
    let token = localStorage.token && JSON.parse(localStorage.token)
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URI}/api/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (data) {
            return {
            data,
            }
        }
    } catch (err) {
        if (err && err.response) {
            return {
                error: err.response.data.error,
            }
        }
    }
}
  