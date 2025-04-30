import * as React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserLogin } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '@/context/userAuthContext';

import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'

const initialValue: UserLogin = {
    email: "",
    password: ""
}

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {

    const [userLoginInfo, setUserLoginInfo] = React.useState<UserLogin>(initialValue);
    const navigate = useNavigate();
    const { googleSignIn, login } = useUserAuth();

    const handleGoogleSignin = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log("===,whats happeing")
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
            await login(userLoginInfo.email, userLoginInfo.password);
            navigate("/")

        } catch (error) {
            console.log(error);

        }
    }
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

                {/* 🔐 Right Side - Login Form */}
                <div className={cn("flex flex-col gap-6 w-2/3 bg-slate-900 rounded-2xl")}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl text-center text-white">PhotoGram</CardTitle>
                            <CardDescription className="text-center text-gray-300">
                                Enter your details below to log in
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} >
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-white">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="babu@example.com"
                                            required
                                            value={userLoginInfo.email}
                                            onChange={(e) => setUserLoginInfo({ ...userLoginInfo, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password" className="text-white">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm text-blue-400 underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={userLoginInfo.password}
                                            onChange={(e) => setUserLoginInfo({ ...userLoginInfo, password: e.target.value })}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full">Login</Button>

                                    <div className="text-center text-white">Or continue with</div>

                                    <Button variant="outline" className="w-full" onClick={handleGoogleSignin}>
                                        Login with Google
                                    </Button>

                                    <p className="mt-3 text-sm text-center text-white">
                                        Don’t have an account? <Link to="/signup" className="text-blue-400 underline">Sign up</Link>
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>


    )
};

export default Login;
