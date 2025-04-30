import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { UserSignup } from "@/types";
import { useUserAuth } from "@/context/userAuthContext";
import { Link, useNavigate } from "react-router-dom";


import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'

const initialValue: UserSignup = {
  email: "",
  password: "",
  confirmPassword: "",
};

interface ISignupProps { }

const SignupForm: React.FunctionComponent<ISignupProps> = () => {
  const [userInfo, setUserInfo] = useState<UserSignup>(initialValue);
  const navigate = useNavigate();
  const { googleSignIn, signup } = useUserAuth();

  const handleGoogleSignin = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/")

    } catch (error) {
      console.log(error);

    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Userinfo: ", userInfo);
      await signup(userInfo.email, userInfo.password);
      navigate("/")

    } catch (error) {
      console.log(error);

    }
  };

  return (



    <div className="w-screen h-screen flex items-center justify-center bg-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center max-w-6xl w-full p-6">

        {/* 📸 Left Side - Photo Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 ">
          <img src={image1} alt="" className="w-2xl h-auto rounded-2xl aspect-auto place-self-end" />
          <img src={image2} alt="" className="h-auto rounded-2xl aspect-auto place-self-end" />
          <img src={image3} alt="" className="h-auto rounded-2xl aspect-auto" />
          <img src={image4} alt="" className="h-auto rounded-2xl aspect-auto place-self-start" />
        </div>


        <div className={cn("flex flex-col gap-6 w-2/3 bg-slate-900 rounded-2xl")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">PhotoGram</CardTitle>
              <CardDescription>
                Enter your details below to signup your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="babu@example.com"
                      required
                      value={userInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserInfo({ ...userInfo, email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>


                    <Input
                      id="password"
                      type="password"
                      required
                      value={userInfo.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                    />

                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={userInfo.confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUserInfo({ ...userInfo, confirmPassword: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Signup
                  </Button>
                  <div className="text-center">
                    Or continue with
                  </div>

                  <Button variant="outline" className="w-full" onClick={handleGoogleSignin}>
                    Login with Google
                  </Button>

                  <p className='mt-3 text-sm text-center'>
                    Already have an account ? <Link to="/login" className="text-blue-400 underline">Login</Link>
                  </p>

                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default SignupForm;
