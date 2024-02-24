import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./theme-toggle";
import { MainNav } from "./main-nav";



const Navbar = async () => {

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <h4 className="text-xl font-semibolf italic ">Blogging</h4>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;