import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isLoading: adminLoading, error } = useQuery({
        queryKey: ["isAdmin", user?.email],
        queryFn: async () => {
            if (!user?.email) return false;

            try {
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                console.log("Admin check response:", res.data);
                return res.data?.role === "admin";
            } catch (err) {
                console.error("Error checking admin status:", err);
                return false;
            }
        },
        enabled: !!user?.email,
        retry: 2,
    });

    return [isAdmin, adminLoading, error];
};

export default useAdmin;