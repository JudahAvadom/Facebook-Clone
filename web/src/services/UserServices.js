import axios from 'axios'

export const fetchUserById = async (user_id) => {
    let token = JSON.parse(localStorage.token)
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URI}/api/user/${user_id}`, {
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