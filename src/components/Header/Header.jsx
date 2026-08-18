import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "../UserModal/UserMenu";
import appIcon from "../../assets/app-icon.png";
import useThemeStore from "../../store/useThemeStore";
import useAuthStore from "../../store/useAuthStore";
import ThemeToggle from "../ui/ThemeToggle";

const GUEST_NAV = [
  { to: "/", label: "Home" },
  { to: "/allCars", label: "Cars" },
  { to: "/carHost", label: "Host" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/contact-us", label: "Contact" },
];

const ADMIN_NAV = [
  { to: "/", label: "Home" },
  { to: "/allCars", label: "Cars" },
  { to: "/dashboard", label: "Admin" },
  { to: "/contact-us", label: "Contact" },
];

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, logout } = useAuthStore();
  const { initialize } = useThemeStore();
  const location = useLocation();
  const isAdmin = profile?.role === "admin";
  const nav = isAdmin ? ADMIN_NAV : GUEST_NAV;

  useEffect(() => {
    initialize();
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialize]);

  return (
    <>
      <header
        className={`fixed w-full z-50 top-0 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--line)] shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <img
              src={appIcon}
              alt=""
              className="h-9 w-9 md:h-10 md:w-10 rounded-[9px] shadow-sm ring-1 ring-[var(--line)] object-cover"
            />
            <span className="text-lg md:text-xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--navy)] transition-colors">
              RentNHost
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative text-sm font-semibold tracking-wide transition-colors ${
                    active ? "text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            {!user ? (
              <Link
                to="/login"
                className="btn-navy px-5 py-2.5 text-sm rounded-[var(--radius-sm)] font-semibold transition"
              >
                Sign in
              </Link>
            ) : (
              <div className="relative">
                <img
                  src={user.photoURL || "https://img.icons8.com/ios-filled/50/user-male-circle.png"}
                  alt="avatar"
                  className="h-10 w-10 cursor-pointer rounded-full border-2 border-[var(--line)] object-cover"
                  onClick={() => setShowModal((prev) => !prev)}
                />
                {showModal && (
                  <div className="absolute right-0 mt-2 w-48 z-50">
                    <UserMenu
                      isAdmin={isAdmin}
                      closeModal={() => setShowModal(false)}
                      logoutHandler={() => {
                        logout();
                        setShowModal(false);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpenDrawer(true)}
              className="p-2 text-[var(--ink)]"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {openDrawer && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setOpenDrawer(false)} />
          <div className="fixed top-0 right-0 h-screen w-72 bg-[var(--surface)] shadow-2xl z-50 p-6 lg:hidden">
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-[var(--ink)]">Menu</span>
              <button onClick={() => setOpenDrawer(false)} className="text-[var(--muted)]">✕</button>
            </div>
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpenDrawer(false)}
                  className="px-4 py-3 rounded-xl font-medium text-[var(--ink)] hover:bg-[var(--bg)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--line)]">
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setOpenDrawer(false)}
                  className="block w-full py-3 text-center bg-[var(--navy)] text-[var(--on-navy)] rounded-[var(--radius-sm)] font-semibold"
                >
                  Sign in
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setOpenDrawer(false);
                  }}
                  className="w-full py-3 text-red-600 font-medium"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
