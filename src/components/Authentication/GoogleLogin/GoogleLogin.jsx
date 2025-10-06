
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosPublic from "../../hook/useAxiosPublic";

const GoogleLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/";
    const axiosPublic = useAxiosPublic();
    const { signInWithGoogle } = useAuth();


    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;
                console.log("Google user:", user);

                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: "user" // Add default role
                };

                try {
                    const response = await axiosPublic.get(`/users/${user.email}`);

                    if (response.data) {
                        console.log("User already exists:", response.data);
                    } else {
                        const res = await axiosPublic.post("/users", userInfo);
                        console.log("New user created:", res.data);
                    }
                } catch (err) {
                    console.error("Error checking/saving Google user:", err.message);

                    try {
                        const res = await axiosPublic.post("/users", userInfo);
                        console.log("User saved to DB:", res.data);
                    } catch (createErr) {
                        console.error("Error creating user:", createErr.message);
                    }
                }

                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.log("Google Sign-in Error:", err.message);
            });
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="btn btn-circle bg-gray-200 hover:bg-blue-500 hover:text-white"
        >
            <FaGoogle />
        </button>
    );
};

export default GoogleLogin;