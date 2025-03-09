import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "./components/ui/separator";
import { useTheme } from "./components/ThemeProvider";
import { Moon as IconMoon, Sun as IconSun } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";

type NavItemProps = {
  children?: ReactNode
}

export function NavItem(props: NavItemProps) {
  return (
    <li className="align-middle">
      {props.children}
    </li>
  );
}

type NavBarProps = {
  children?: ReactNode
}

export default function NavBar(props: NavBarProps) {
  //----- Services -----
  const { t } = useTranslation();
  const { setTheme } = useTheme();
  
  //----- State -----

  //----- Events -----

  //----- View -----
  return (
    <nav className="fixed top-0 left-0 w-full bg-card shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("app.title")}</h1>
        <ul className="flex space-x-1">
          {props.children}
          <NavItem>
            <Separator orientation="vertical" />
          </NavItem>
          <NavItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavItem>
          <NavItem>
            <Separator orientation="vertical" />
          </NavItem>
          <NavItem>
            <a href="https://react.dev">
              <img src="./src/assets/react.svg" />
            </a>
          </NavItem>
        </ul>
      </div>
    </nav>
  );
}
