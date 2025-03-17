import axios from 'axios';
import { errorHandler } from "../Utilities/ErrorHandler.js";

const VerifyUserAsync = errorHandler(async function UserService_VerifyUserAsync() {
    const response = (await axios.get('url', { withCredentials: true })).data;
    if (!response.isSuccess)
        return { isSuccess: false };
    return { isSuccess: true };
});

export default {
    VerifyUserAsync,
}