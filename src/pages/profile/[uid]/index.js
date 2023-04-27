import { Formik, Form, Field } from "formik";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/services/firebase";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordConfirm: Yup.string("Enter password confirmation").oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  role: Yup.string().required("Select a role"),
});

export default function ProfileUpdatePage() {
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (res.user) {
        await updateProfile(res.user, {
          displayName: values.name,
          emailVerified: true,
        });
        await setDoc(doc(db, "users", res.user.uid), {
          role: values.role,
          name: values.name,
          emailVerified: true,
        });
        const registerSuccessNotify = () =>
          toast.success("Registered successfully");
        registerSuccessNotify();
        setLoading(false);
      }
    } catch (e) {
      const errorNotify = () => toast.error(e.message);
      errorNotify();
      setLoading(false);
    }
  };

  return (
    <main className="bg-teal-500">
      <div className="h-screen flex items-center justify-center">
        <Formik
          initialValues={{
            name: "",
            email: "",
            terms: "",
            password: "",
            passwordConfirm: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <div className="flex w-1/2">
              <Form className="bg-white flex-1 text-gray-700 px-12 py-8 rounded-lg">
                <h1 className="text-3xl">Register</h1>
                <div className="mt-5">
                  {/* Name field */}
                  <div className="mt-4">
                    <label
                      htmlFor="name"
                      className={`block text-sm mb-2 ${
                        touched.name && errors.name ? "text-red-400" : ""
                      } `}
                    >
                      {touched.name && errors.name ? errors.name : "Name"}
                    </label>
                    <Field
                      className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500 "
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Role field */}
                  <div className="mt-4" role="group">
                    <label
                      htmlFor="role"
                      className={`block text-sm mb-2 ${
                        touched.role && errors.role ? "text-red-400" : ""
                      }`}
                    >
                      {touched.role && errors.role ? errors.role : "Role"}
                    </label>
                    <div className="flex items-center">
                      <Field
                        type="radio"
                        id="radio1"
                        name="role"
                        value="pharmacist"
                      />
                      <label htmlFor="radio1" className="ml-2 text-gray-700">
                        Pharmacist
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Field
                        type="radio"
                        id="radio2"
                        name="role"
                        value="doctor"
                      />
                      <label htmlFor="radio2" className="ml-2 text-gray-700">
                        Doctor
                      </label>
                    </div>
                  </div>

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
                    />
                  </div>

                  {/* Password confirmation */}
                  <div className="mt-4">
                    <label
                      htmlFor="passwordConfirm"
                      className={`block text-sm mb-2 ${
                        touched.passwordConfirm && errors.passwordConfirm
                          ? "text-red-400"
                          : ""
                      }`}
                    >
                      {touched.passwordConfirm && errors.passwordConfirm
                        ? errors.passwordConfirm
                        : "Re-enter password"}
                    </label>

                    <Field
                      id="passwordConfirm"
                      className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                      type="password"
                      name="passwordConfirm"
                      placeholder="Re-enter your password"
                    />
                  </div>

                  {/* Terms of service*/}
                  <div className="mt-4">
                    <label
                      htmlFor="terms"
                      className={`block text-sm mb-2 ${
                        touched.terms && errors.terms ? "text-red-400" : ""
                      }`}
                    >
                      {touched.terms && errors.terms
                        ? errors.terms
                        : "Terms of service"}
                    </label>

                    <div className="flex items-center gap-2">
                      <Field
                        id="terms"
                        type="checkbox"
                        name="terms"
                        value="checked"
                        className="h-5 w-5 text-teal-500 border-2  background-gray-500 focus:border-teal-500 focus:ring-teal-500"
                      />
                      <p className="text-sm text-gray-500">
                        I agree to the Terms and Service
                      </p>
                    </div>
                  </div>

                  {/*Register button*/}
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
                    Register
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </main>
  );
}
