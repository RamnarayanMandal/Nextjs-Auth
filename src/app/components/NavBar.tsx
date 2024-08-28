'use client';
import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "@/app/components/ui/navbar-menu"; // Removed unnecessary import
import { cn } from "@/utils/cn";
import Link from 'next/link';


const NavBar = ({ className }: { className?: string }) => {
    const [active, setActive] = useState<string | null>(null);
 
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 lg:text-base md:text-base text-sm", className)}>
            <Menu setActive={setActive}>
                <Link href="/">
                    <MenuItem setActive={setActive} active={active} item="Home" />
                </Link>

                {/* Example menu item */}
                {/* <MenuItem setActive={setActive} active={active} item="Our Courses">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/courses">All courses</HoveredLink>
                        <HoveredLink href="/courses">Basic Music Theory</HoveredLink>
                        <HoveredLink href="/courses">Advanced Composition</HoveredLink>
                        <HoveredLink href="/courses">Songwriting</HoveredLink>
                        <HoveredLink href="/courses">Music Production</HoveredLink>
                    </div>
                </MenuItem> */}

                
                    <Link href="/login">
                        <MenuItem setActive={setActive} active={active} item="Login" />
                    </Link>
           

                <Link href="/singup">
                    <MenuItem setActive={setActive} active={active} item="Sign up" />
                </Link>
            </Menu>
        </div>
    )
}

export default NavBar;
