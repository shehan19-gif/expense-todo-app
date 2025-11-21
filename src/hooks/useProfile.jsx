import { useEffect, useState } from "react";
import { userAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const useProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [userCredentials, setUserCredentials] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setLoading(true);

        try {
            const response = await userAPI.getUser();
            const userData = response.data || null;
            setUserDetails(userData);

        } catch(err) {
            setError(err.message);
            setUserDetails(null);

        } finally {
            setLoading(false);
        }
    };

    const updateUserDetails = async (userData) => {
        try {
            const response = await userAPI.updateUserData(userData);
            const updatedData = response.data || userData;
            setUserDetails(updatedData);
            return {success: true};

        } catch(err) {
            return { success: false, error: err.message };
        }
    };

    const updateUserCredentials = async (credentialsData) => {
        try {
            const response = await userAPI.updateUserCredentials(credentialsData);
            const updatedData = response.data || credentialsData;
            setUserCredentials(updatedData);
            return {success: true};

        } catch(err) {
            return { success: false, error: err.message };
        }
    };

    const deleteUser = async () => {
        try {
            await userAPI.delete();
            navigate("/");
            return {success: true};

        } catch(err) {
            return {success: false, error: err.message};
        }
    };

    return {
        userDetails,
        userCredentials,
        error,
        loading,
        updateUserDetails,
        updateUserCredentials,
        deleteUser,
        refetch: fetchUserData,
    };
};