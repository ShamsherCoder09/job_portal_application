import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Button } from "../ui/button";
import { LogOut, User } from "lucide-react";

function Navbar() {
    const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between h-15 mx-auto max-w-5xl mt-2">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex gap-12 items-center">
          <ul className="flex items-center gap-5 font-medium">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {
            !user ? (
                <div className="flex items-center gap-2">
                    <Button variant="outline">Login</Button>
                    <Button className="bg-[#6a38C2] hover:bg-[#5b30a6]">Signup</Button>
                </div>
            ):(<Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      className="w-[35px] rounded-full"
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mt-2 shadow-xl px-4 py-4 pt-4 pb-1 ">
                  <div className="flex gap-5 space-y-1">
                    <Avatar className="cursor-pointer mx-1 mt-1">
                      <AvatarImage
                        className="w-[35px] rounded-full"
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">MERN Stack Dev</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2">
                    <div className="flex w-fit items-center cursor-pointer gap-2">
                        <User/>
                        <Button  className="text-gray-500 font-medium" variant="link">View Profile</Button>
                    </div>
                    <div className="flex w-fit cursor-pointer items-center gap-2">
                        <LogOut/>
                        <Button className="text-gray-500" variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>)
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
