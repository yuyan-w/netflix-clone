import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

const page = async () => {
  const session = await getAuthSession();
  if (!session) {
    redirect("/auth");
  }

  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link href={"/"}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                  draggable={false}
                  className="w-max h-max object-contain"
                  src={imgSrc}
                  alt=""
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {session?.user?.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
