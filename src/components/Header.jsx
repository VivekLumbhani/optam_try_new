import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const user = {
    name: "User name",
    id: "001",
    email: "user@gmail.com",
  };

  return (
    <>
      <header className="w-full bg-am-dark text-am-dark-foreground px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight">OPTAM</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="inline-block">
              <Button
                variant="ghost"
                className="text-am-dark-foreground hover:text-white hover:bg-white/10"
              >
                Home
              </Button>
            </Link>
            <Link to="/projects" className="inline-block">
              <Button
                variant="ghost"
                className="text-am-dark-foreground hover:text-white hover:bg-white/10"
              >
                Projects
              </Button>
            </Link>
            <Link to="/analytics" className="inline-block">
              <Button
                variant="ghost"
                className="text-am-dark-foreground hover:text-white hover:bg-white/10"
              >
                Analytics
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Product ID"
              className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
          </div>

          {/* User dropdown */}
          <div className="relative inline-block text-left">
            <div onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
              <Button
                variant="ghost"
                size="icon"
                className="text-am-dark-foreground hover:bg-white/10"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
            {userDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                <div className="px-4 py-3 text-sm text-gray-700">
                  <div className="text-gray-500">{user.id}</div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-gray-500">{user.email}</div>
                </div>
                <div className="border-t border-gray-100"></div>
                <div className="py-1">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => alert("Profile clicked")}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => alert("Settings clicked")}
                  >
                    Settings
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => alert("Logout clicked")}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div onClick={() => setMenuOpen(!menuOpen)}>
            <Button
              variant="ghost"
              size="icon"
              className="text-am-dark-foreground hover:bg-white/10 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile nav menu */}
      {menuOpen && (
        <nav className="md:hidden bg-am-dark text-white px-6 py-4 space-y-2">
          <Link to="/" className="block">
            Home
          </Link>
          <Link to="/projects" className="block">
            Projects
          </Link>
          <Link to="/analytics" className="block">
            Analytics
          </Link>
        </nav>
      )}
    </>
  );
};

export default Header;
