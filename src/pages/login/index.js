import { Formik, Form, Field } from "formik";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "@/services/firebase";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const loginSuccessNotify = () => toast.success("Logged in successfully");

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      loginSuccessNotify();
      setLoading(false);
      if (res.user) {
        router.push("/dashboard");
      }
    } catch (e) {
      const errorNotify = () => toast.error("Invalid credentials");
      errorNotify();
      setLoading(false);
    }
  };

  return (
    <div className="bg-teal-500">
      <div className="h-screen flex items-center justify-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <div className="flex w-1/2">
              <Form className="bg-white flex-1 text-gray-700 px-12 py-8 rounded-lg">
                <h1 className="text-3xl">Login</h1>
                <div className="mt-5">
                  {/* Email field */}
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className={`block text-sm mb-2 ${
                        touched.email && errors.email ? "text-red-400" : ""
                      }`}
                    >
                      {touched.email && errors.email ? errors.email : "Email"}
                    </label>
                    <Field
                      id="email"
                      className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Password field */}
                  <div className="mt-4">
                    <label
                      htmlFor="password"
                      className={`block text-sm mb-2 ${
                        touched.password && errors.password
                          ? "text-red-400"
                          : ""
                      }`}
                    >
                      {touched.password && errors.password
                        ? errors.password
                        : "Password"}
                    </label>

                    <Field
                      id="password"
                      className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {/*Login button*/}
                  <button
                    type="submit"
                    className="bg-teal-500 text-sm text-white py-3 mt-6 rounded-lg w-full px-4 inline-flex justify-center items-center gap-2 border border-transparent font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800 disabled:cursor-not-allowed disabled:bg-teal-500 disabled:bg-opacity-50"
                    disabled={loading}
                  >
                    <span
                      className={`animate-spin ${
                        loading ? "inline-block" : "hidden"
                      } w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full`}
                      role="status"
                      aria-label="loading"
                    ></span>
                    Login
                  </button>
                  <div className="mt-3">
                    <Link href="/register" className="text-teal-500">
                      No account? Go to register
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
