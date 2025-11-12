import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
// Menggunakan import penuh (hanya berfungsi di proyek Next.js Anda)
import { createPopper } from "@popperjs/core";

const PagesDropdown = () => {
    // 1. Perbaikan: Menggunakan useRef() Hook
    const btnDropdownRef = useRef(null);
    const popoverDropdownRef = useRef(null);

    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

    const openDropdownPopover = () => {
        setDropdownPopoverShow(true);
        // Pastikan createPopper hanya dijalankan jika ref ada
        if (btnDropdownRef.current && popoverDropdownRef.current) {
            // 2. Perbaikan: Popper dijalankan
            createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
                placement: "bottom-start",
            });
        }
    };

    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    return (
        <>
            <a
                className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
                href="#pablo"
                // 1. Perbaikan: Menggunakan ref
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow
                        ? closeDropdownPopover()
                        : openDropdownPopover();
                }}
            >
                Demo Pages
            </a>
            <div
                // 1. Perbaikan: Menggunakan ref
                ref={popoverDropdownRef}
                className={
                    // Menggunakan properti 'relative' pada elemen induk <li>
                    // dan 'absolute' pada div popover jika Popper tidak bekerja sempurna
                    (dropdownPopoverShow ? "block " : "hidden ") +
                    "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 absolute"
                }
            >
                {/* Admin Layout */}
                <span
                    className={
                        "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                    }
                >
                    Admin Layout
                </span>
                {/* 3. Perbaikan: Tambahkan legacyBehavior ke setiap Link */}
                <Link href="/admin/dashboard" legacyBehavior>
                    <a
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-blueGray-100"
                        }
                    >
                        Dashboard
                    </a>
                </Link>
                <Link href="/admin/settings" legacyBehavior>
                    <a
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-blueGray-100"
                        }
                    >
                        Settings
                    </a>
                </Link>
                {/* ... (Link lainnya dihilangkan untuk ringkasan) ... */}

                <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />

                {/* Auth Layout */}
                <span
                    className={
                        "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
                    }
                >
                    Auth Layout
                </span>
                <Link href="/auth/login" legacyBehavior>
                    <a
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-blueGray-100"
                        }
                    >
                        Login
                    </a>
                </Link>
                <Link href="/auth/register" legacyBehavior>
                    <a
                        className={
                            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-blueGray-100"
                        }
                    >
                        Register
                    </a>
                </Link>

                {/* ... (Link lainnya dihilangkan untuk ringkasan) ... */}
            </div>
        </>
    );
};

export default PagesDropdown;
