
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    /*
      TODO:
      Connect this to the backend later.

      Example:
      POST /auth/register

      {
        firstName,
        lastName,
        username,
        email,
        password
      }
    */

    setIsLoading(true);

    // Temporary frontend-only behaviour
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 500);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-xl mx-auto">
      <Card className="glass border-white/40 shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl">

        {/* Header */}
        <CardHeader className="space-y-3 pb-6 text-center">

          <div className="flex justify-center mb-2">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
              Create your account
            </CardTitle>

            <CardDescription className="text-base text-slate-500">
              Create an account to save and track your burnout predictions
            </CardDescription>
          </div>

        </CardHeader>

        {/* Form */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* First Name + Last Name */}
            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-slate-700 font-medium"
                >
                  First Name
                </Label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`h-11 pl-9 bg-white/50 border-slate-200/60 ${
                      errors.firstName ? "border-red-300" : ""
                    }`}
                  />
                </div>

                {errors.firstName && (
                  <p className="text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-slate-700 font-medium"
                >
                  Last Name
                </Label>

                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`h-11 bg-white/50 border-slate-200/60 ${
                    errors.lastName ? "border-red-300" : ""
                  }`}
                />

                {errors.lastName && (
                  <p className="text-xs text-red-500">
                    {errors.lastName}
                  </p>
                )}
              </div>

            </div>

            {/* Username + Email */}
            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-slate-700 font-medium"
                >
                  Username
                </Label>

                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe123"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`h-11 bg-white/50 border-slate-200/60 ${
                    errors.username ? "border-red-300" : ""
                  }`}
                />

                {errors.username && (
                  <p className="text-xs text-red-500">
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 font-medium"
                >
                  Email
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`h-11 pl-9 bg-white/50 border-slate-200/60 ${
                      errors.email ? "border-red-300" : ""
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

            </div>

            {/* Password Section */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-medium"
                >
                  Password
                </Label>

                <div className="relative">

                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`h-11 pl-9 pr-10 bg-white/50 border-slate-200/60 ${
                      errors.password ? "border-red-300" : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-slate-700 font-medium"
                >
                  Confirm Password
                </Label>

                <div className="relative">

                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`h-11 pl-9 pr-10 bg-white/50 border-slate-200/60 ${
                      errors.confirmPassword ? "border-red-300" : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}

              </div>

            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 mt-4 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col space-y-4 pb-8">

          <div className="text-center text-sm text-slate-500 w-full border-t border-slate-100 pt-6">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-primary hover:text-secondary transition-colors"
            >
              Sign in
            </Link>
          </div>

        </CardFooter>

      </Card>
    </div>
  );
}

export default Register;
```
