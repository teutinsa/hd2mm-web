import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type NavItemProps = {
  children?: ReactNode
}

export function NavItem(props: NavItemProps) {
  return (
    <li className="nav-item">
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
    <nav>
      <div>
        <span>{t("app.title")}</span>
        <ul>
          {props.children}
        </ul>
      </div>
    </nav>
  );
}