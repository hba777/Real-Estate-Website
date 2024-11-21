import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
const LoginPage = () => {
  return (
    <div className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2 rounded-lg shadow-lg">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col rounded-lg">
          <div className="my-4 text-center">
            <h1 className="text-3xl font-semibold ">Login</h1>
            <p className="mt-2 text-xs text-slate-400">
              Find the property of your dream
            </p>
          </div>
          <form>
            <Button
              className="flex items-center w-full gap-4 px-12 mb-4 bg-transparent rounded-full"
              variant="outline"
            >
              {" "}
              <FcGoogle size="25" />
              Sign In With Google
            </Button>
            <Label htmlFor="email">Email*</Label>
            <Input
              className="mt-1 mb-2 bg-transparent rounded-full"
              type="email"
              id="email"
              placeholder="Email"
            />
            <Label htmlFor="password">Password*</Label>
            <Input
              className="mt-1 bg-transparent rounded-full mb-2"
              type="password"
              id="password"
              placeholder="password"
            />

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Login
            </Button>
          </form>
          <p className="mt-4 text-xs text-slate-200">
            @2023 All rights reserved
          </p>
        </div>
        <div className="relative hidden md:block">
          <Image
            className="object-cover "
            fill={true}
            src="/bg.jpg"
            alt="bg-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
