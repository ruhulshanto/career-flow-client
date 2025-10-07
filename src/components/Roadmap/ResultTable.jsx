import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../hook/useAxiosSecure";
import Swal from "sweetalert2";


const ResultTable = ({ result, index, refetch }) => {

    const axiosSecure = useAxiosSecure();
       
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/results/${id}`)
                    .then(res => {
                        console.log("Delete response:", res.data);
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                "Deleted!",
                                "Your result has been deleted.",
                                "success"
                            );
                        }
                    })
                    .catch(err => {
                        console.error("Error deleting result:", err);
                        Swal.fire(
                            "Error!",
                            "There was an error deleting the result.",
                            "error"
                        );
                    });
            
            }
        });
    }
    return (
        <tr className="hover">
            <td>{index + 1}</td>
            <td>{result.score}</td>
            <td>{result.total}</td>
            <td>{((result.score / result.total) * 10).toFixed(1)} / 10</td>
            <td>{new Date(result.date).toLocaleString()}</td>
            <td>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                    <button
                        onClick={() => handleDelete(result._id)}
                        className="btn btn-sm btn-error text-white">
                        <FaTrash /> Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ResultTable;