import React from "react";
import { Link } from "react-router-dom";
import appIcon from "../../assets/app-icon.png";

const Footer = () => {
  return (
    <footer className="bg-[var(--navy)] text-[var(--on-navy)]/80">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <img
              src={appIcon}
              alt=""
              className="h-10 w-10 rounded-[9px] object-cover ring-1 ring-white/15"
            />
            <span className="text-lg font-bold tracking-tight text-[var(--on-navy)]">
              RentNHost
            </span>
          </Link>
          <p className="mt-4 text-sm text-[var(--on-navy)]/60 leading-relaxed">
            Easy renting. Secure hosting.
          </p>
        </div>

        {[
          { title: "Product", links: [["Cars", "/allCars"], ["Host", "/carHost"], ["Dashboard", "/dashboard"]] },
          { title: "Company", links: [["About", "/about-us"], ["Contact", "/contact-us"]] },
          { title: "Legal", links: [["Terms", "#"], ["Privacy", "#"]] },
          { title: "Social", links: [["LinkedIn", "#"], ["Twitter", "#"]] },
        ].map((col) => (
          <div key={col.title}>
            <p className="font-bold text-[var(--on-navy)] mb-3">{col.title}</p>
            <div className="flex flex-col gap-2 text-sm text-[var(--on-navy)]/75">
              {col.links.map(([label, href]) => (
                <Link key={label} to={href} className="hover:text-[var(--accent)] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--on-navy)]/10 py-5 text-center text-xs text-[var(--on-navy)]/45">
        © {new Date().getFullYear()} RentNHost. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
