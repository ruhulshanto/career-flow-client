
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import registerSvgImg from '../../../assets/Authenticaion/RegisterSVG.svg';
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import useAuth from "../../hook/useAuth";
import useAxiosPublic from "../../hook/useAxiosPublic";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";


const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile, logOut } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log('sign up New user', loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('User profile reset Update');
                        // create Users entry in Database ::>
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your registration is complete",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                    logOut()
                                        .then(() => {
                                            console.log('sign up & logout successfully')
                                            navigate('/login');
                                        })
                                        .catch(err => {
                                            console.log("logout is not successful", err.message)
                                        })
                                }
                            })
                    })
                    .catch(err => {
                        console.log(err.message)
                    })

            })
            .catch(err => {
                console.log("Registration error:", err.message);
            });
    };


    return (
        <div
            data-aos="flip-right"
            data-aos-duration="1000"
            className=" flex items-center justify-center bg-cover bg-center">
            <div className="bg-white/95 shadow-2xl rounded-2xl flex w-11/12 md:w-3/4 lg:w-2/3 overflow-hidden">

                <div className="w-full md:w-1/2 p-10">
                    {/* <h2 className="text-2xl font-bold text-center mb-8">Register</h2> */}

                    <form onSubmit={handleSubmit((onSubmit))} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block font-medium mb-1">Name</label>
                            {errors.name?.type === "required" && (
                                <p className='text-red-700 text-sm'>Your Name is required</p>
                            )}
                            <input type="text" name='name'  {...register("name", { required: true })} placeholder="Enter Your Name" className="w-full input input-bordered rounded-lg mt-1" />
                        </div>
                        {/* photo URL */}
                        <div>
                            <label className="block font-medium mb-1">Photo URL</label>
                            {errors.photoURL?.type === "required" && (
                                <p className='text-red-700 text-sm'>Photo URL is required</p>
                            )}
                            <input type="text" name='photoURL'  {...register("photoURL", { required: true })} placeholder="Enter Your photoURL" className="w-full input input-bordered rounded-lg mt-1" />
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            {errors.email?.type === "required" && (
                                <p className='text-red-700 text-sm'>Email is required</p>
                            )}
                            <input type="email" name='email'  {...register("email", { required: true })} placeholder="Email" className="w-full input input-bordered rounded-lg mt-1" />
                        </div>
                        {/* Password */}
                        <div>
                            <label className="block font-medium mb-1">Password</label>
                            {errors.password?.type === "required" && (
                                <p className='text-red-700 text-sm'>Password is required</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className='text-red-700 text-sm'>Password should be at least 6 characters</p>
                            )}
                            <input type="password" name='password'  {...register("password", { required: true, minLength: 6 })} placeholder="Enter your password" className="w-full input input-bordered rounded-lg mt-1" />
                        </div>
                        {/* Submit button */}
                        <input type="submit" value="Sign Up" className="btn w-full my-2 text-white bg-blue-500 hover:bg-blue-600 font-semibold uppercase" />
                    </form>



                    <p className="text-center mt-4 text-[16px] font-semibold">
                        Already registered?{" "}
                        <Link to="/login" className="text-yellow-600 hover:text-[#316ff6] underline underline-offset-4">
                            GO to Login
                        </Link>
                    </p>

                    {/* Social Logins */}
                    <div className="mt-6 text-center">
                        <p className="mb-2">Or Sign Up with</p>
                        <div className="flex justify-center gap-4">

                            <button className="btn btn-circle bg-gray-200 hover:bg-blue-500 hover:text-white">
                                <FaFacebookF />
                            </button>

                            <GoogleLogin></GoogleLogin>

                            <button className="btn btn-circle bg-gray-200 hover:bg-blue-500 hover:text-white">
                                <FaTwitter />
                            </button>

                        </div>
                    </div>
                </div>


                {/* Right Image */}
                <div className="hidden md:flex md:flex-col md:w-1/2 items-center justify-center p-6 bg-gray-100">
                    <h2 className="text-2xl font-bold text-center uppercase -mt-16 py-12">Register now</h2>

                    <img
                        src={registerSvgImg}
                        alt="Restaurant Illustration"
                        className="max-w-xs"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;