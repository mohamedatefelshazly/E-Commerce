import React from 'react'
import { NavLink } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
    VisuallyHidden,
} from "@heroui/react";

import logo from "../../assets/E-Commerce assets/images/freshcart-logo.svg"
import { useContext } from 'react';
import { authContext } from '../../Context/AuthContext/AuthContextProvider';
// import { NavLink } from 'react-router-dom';

export default function Nav() {
    const { userToken, setuserToken } = useContext(authContext)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Home",
        "Brands",
        "Categeroies",
        "Cart",
    ];

    return (
        <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} className='mb-4'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">
                        <img src={logo} alt="logo" className='w-full' />
                    </p>
                </NavbarBrand>
            </NavbarContent>

            {userToken && <NavbarContent className="hidden sm:flex gap-2 relative lg:start-[-10%]" justify="center">
                {menuItems.map((item, i) => <NavbarItem key={i}>
                    <Link color="foreground" href="">
                        <NavLink to={item.toLowerCase()} >{item}</NavLink>

                    </Link>
                </NavbarItem>)}

            </NavbarContent>}

            <NavbarContent justify="end">

                <div className='hidden sm:flex justify-center gap-2'>
                    <i className='fa-brands fa-instagram'></i>
                    <i className='fa-brands fa-facebook'></i>
                    <i className='fa-brands fa-tiktok'></i>
                    <i className='fa-brands fa-twitter'></i>
                    <i className='fa-brands fa-linkedin'></i>
                    <i className='fa-brands fa-youtube'></i>
                </div>
                {!userToken && <>
                    <NavbarItem className="hidden lg:flex">
                        <Link href="/login">
                            <NavLink to={"/login"}> Login</NavLink>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" className='bg-blue-200 rounded-md text-white' href="/register" variant="flat">
                            <NavLink to={"/register"}> Sign Up</NavLink>
                        </Button>
                    </NavbarItem>
                </>}
                {userToken && <NavbarItem className="hidden lg:flex">
                    <Link href="/login">
                        <NavLink to={"/login"} onClick={() => {
                            setuserToken(null)
                            localStorage.removeItem("userToken")
                        }}> Logout</NavLink>
                    </Link>
                </NavbarItem>}


            </NavbarContent>
            {userToken && <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>}

        </Navbar>
    )
}
