import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";


const SignUpPage = () => {
  const [showPassword, setPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup, isSignUp } = useAuthStore();

  const validationForm = () => {
    if (!formData.name.trim()) {
        toast.error("Full name required");
        return false;
    }
    if (!formData.email.trim()) {
        toast.error("Email is required");
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Email is invalid");
        return false;
    }
    if (!formData.password.trim()) {
        toast.error("Enter password");
        return false;
    }
    return true; // Return true if validation passes
};


const handleSubmmit = (e) => {
  e.preventDefault();

  if (validationForm()) {
      signup(formData);
  }
};


  return (
    <div className="min -h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare />
              </div>
              <h1 className="text-green-500">create account</h1>
              <p className="text-base-content/60">get started</p>
            </div>
          </div>
          <form onSubmit={handleSubmmit} className="space-y-6">
            <div className="form control">
              <label className="label">
                <span className="labe-text font-medium">NAME</span>
              </label>
              <div className="relative">
                <div className="absolute insert-y-0 left-2 pt-1 pl-1 flex items-center pointer-events-none">
                  <User className="size-7 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={"input input-bordered w-full pl-15"}
                  placeholder="john doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div> 
               <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute insert-y-0 left-2 pt-2 pl-1 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40"/>
                  </div>
                  <input type="email"
                  className={`input input-bordered w-full pl-15 pb-1.5`}
                  placeholder="you@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                </div>
               </div>


            <div className="form-control">
                  <label className="label">
                    <span className="labe-text font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute insert-y-0 left-2 pt-2 pl-1 flex items-center pointer-events-none">
                      <Lock className=" size-5 text-base-content/40"/>
                    </div>
                    <input type={showPassword? "text" : "password"}
                    className= "input input-bordered w-full pl-10 pr-10"
                    placeholder="*****"
                    value={formData.password}
                    onChange={(e) => setFormData ({...formData,password: e.target.value})}
                     />
                     <button
                      type="button"
                      className="absolute inset-y-0 right-2  flex items-center"
                      onClick={() => setPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5 text-base-content/40"/>
                        ): (
                          <Eye className="size-5 text-base-content/40"/>
                        )}
                      </button>
                  </div>
            </div>
            <button type="submmit" className="btn btn-primary w-full" disabled= {isSignUp}>
              {isSignUp ? (
                <>
                <Loader2 className="size-5 animate-spin"/>
                Loading ...
                </>
              ) : ("create Account")}
            </button>
          </form>
          <div className="text-cent">
            <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to= "/login" className="link link-primary" >
            Sign in
            </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern 
      title="join community"
      subttitle="connect with friends,share momemnts and stay in touch with them"
      />
    </div>
  );
};
export default SignUpPage;
