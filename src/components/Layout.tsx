import { Outlet, Link, useLocation } from "react-router-dom";
import { Search, User, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import usmLogo from "@/assets/usm-logo.png";

const Layout = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b border-border shadow-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                aria-label="Universidad Técnica Federico Santa María"
                className="flex-shrink-0"
              >
                <img 
                  src={usmLogo} 
                  alt="USM Logo" 
                  className="h-11 w-auto"
                />
              </Link>
              <div className="border-l border-border pl-3">
                <h1 className="text-xl font-bold text-primary">PAU</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Plataforma de Ayudantías Unificada</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 ${
                  isActive("/") 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <User className="h-4 w-4" />
                <span>Mis Postulaciones</span>
              </Link>
              <Link
                to="/explore"
                className={`flex items-center gap-2 px-3 py-2 ${
                  isActive("/explore") 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Search className="h-4 w-4" />
                <span>Explorar Ayudantías</span>
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-x-3">
              <Button variant="ghost" size="sm" className="relative hover:text-primary">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5">
                  2
                </Badge>
              </Button>
              <div className="flex items-center gap-x-2 ms-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">DIU</span>
                </div>
                <span className="hidden sm:inline text-sm font-medium text-foreground">David Ibañez Urrutia</span>
              </div>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-background border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors flex-1 justify-center ${
                isActive("/") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <User className="h-4 w-4" />
              <span className="text-sm">Postulaciones</span>
            </Link>
            <Link
              to="/explore"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors flex-1 justify-center ${
                isActive("/explore") 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Explorar</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;