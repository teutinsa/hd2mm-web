import { ReactNode, useState } from "react";
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
  const { t } = useTranslation();

  const [ darkmode, setDarkmode ] = useState(isDarkmode());

  function toggleDarkmode() {
    const value = isDarkmode();
    if (value) {
      document.documentElement.setAttribute("data-bs-theme", "light");
    } else {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    }
    setDarkmode(!value);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">{t("app.title")}</span>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {props.children}
        </ul>
        <button className="btn d-flex" onClick={toggleDarkmode}>
          {darkmode ? (
            <i className="bi bi-sun" />
          ) : (
            <i className="bi bi-moon" />
          )}
        </button>
      </div>
    </nav>
  );
}

function isDarkmode(): boolean {
  return document.documentElement.getAttribute("data-bs-theme") === "dark";
}