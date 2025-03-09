import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "./components/ui/separator";

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
            <a href="https://react.dev">
              <img src="./src/assets/react.svg" />
            </a>
          </NavItem>
        </ul>
      </div>
    </nav>
  );
}
