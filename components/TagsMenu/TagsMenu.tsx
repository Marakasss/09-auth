"use client";

import { useEffect, useRef, useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { tags } from "@/constants/tags";

const TagsMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => setMenuIsOpen(!menuIsOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isHover) {
      const timeOut = setTimeout(() => setMenuIsOpen(false), 300);
      return () => clearTimeout(timeOut);
    } else {
      setMenuIsOpen(true);
    }
  }, [isHover]);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={menuRef}
      className={css.menuContainer}
    >
      <button onClick={handleMenuToggle} className={css.menuButton}>
        Notes ▾
      </button>
      {menuIsOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                onClick={() => {
                  setIsHover(false);
                  setMenuIsOpen(false);
                }}
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
