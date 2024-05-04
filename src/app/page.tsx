import Image from "next/image";
import { Button } from "@/components/ui/button";

import logo from "../assets/logo.svg";
import main from "../assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container min-h-screen flex flex-col py-4">
      <div className="mb-8 md:mb-4">
        <Image src={logo} alt="logo" />
      </div>

      <div className="flex-1 flex items-center gap-10 flex-col md:flex-row text-center md:text-left justify-center">
        <div className="space-y-4 md:flex-[60%]">
          <h1 className="capitalize text-5xl md:text-7xl font-bold ">
            <span className="font-black text-primary">Job</span> tracking app
          </h1>
          <p className="md:max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
            error. Ea, molestiae! Soluta, similique! Sunt tempore, error
            consectetur nobis expedita delectus laboriosam veniam dolores omnis
            in architecto quasi optio maxime.
          </p>
          <Button asChild>
            <Link href="/add-job">Get started</Link>
          </Button>
        </div>

        <div className="md:flex-[40%] max-w-[400px] md:max-w-[none]">
          <Image src={main} alt="main" priority />
        </div>
      </div>
    </main>
  );
}
