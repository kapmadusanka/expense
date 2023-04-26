import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/slice/authSlice";
import { useLoginMutation } from "../../app/api/authApiSlice";
import { loginInput, loginLable } from "./loginClassNames";
import TextInput from "../../components/formInput/TextInput";

const Login = () => {
  const userRef: any = useRef();
  const errRef: any = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // userRef.current.focus();
  }, []);

  useEffect(() => {
      console.log(userRef.current)
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (err: any) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e: any) => setUser(e.target.value);

  const handlePwdInput = (e: any) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className=" bg-primary-1000 ">
      {/* flex-col items-center justify-center px-6 py-8  h-screen lg:py-0  */}
      <div className="flex flex-col items-center  justify-center h-screen xs:px-5  xs:bg-primary-200 sm:bg-primary-400 md:bg-primary-800 lg:bg-primary-1000">
        <div className="w-full bg-primary-50  rounded-lg shadow  sm:max-w-md xl:p-0 ">
          <div className="flex flex-col items-center justify-center">
            <a href="#" className="flex items-center mb-6 text-2xl">
              <img
                className="w-32 h-22 mr-2 mt-10"
                src="https://mickiesoft.com/wp-content/uploads/2022/10/cropped-cropped-MickieSoft-Logo-1-01.png"
                alt="logo"
              />
            </a>
          </div>
          <div className="p-6  sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className={`${loginLable}`}>
                  Username:
                </label>
                <TextInput
                  type="text"
                  id="username"
                  ref={userRef}
                  value={user}
                  onChange={handleUserInput}
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className={`${loginLable}`}>
                  Password:
                </label>
                <TextInput
                  type="password"
                  id="password"
                  onChange={handlePwdInput}
                  value={pwd}
                  required
            
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <TextInput
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      required={false}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-primary-50 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  return content;
};
export default Login;
