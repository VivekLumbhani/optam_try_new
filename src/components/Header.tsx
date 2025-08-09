import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="w-full bg-am-dark text-am-dark-foreground px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-bold tracking-tight">DIGITAL THREAD</h1>
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" className="text-am-dark-foreground hover:text-white hover:bg-white/10">
            Home
          </Button>
          <Button variant="ghost" className="text-am-dark-foreground hover:text-white hover:bg-white/10">
            Projects
          </Button>
          <Button variant="ghost" className="text-am-dark-foreground hover:text-white hover:bg-white/10">
            Analytics
          </Button>
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
        <Button variant="ghost" size="icon" className="text-am-dark-foreground hover:bg-white/10">
          <User className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-am-dark-foreground hover:bg-white/10 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;