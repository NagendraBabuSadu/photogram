import * as React from 'react';
import addIcon from '@/assets/icons/add.svg'
import photoIcon from '@/assets/icons/photo.svg'
import settingsIcon from '@/assets/icons/settings.svg'
import homeIcon from '@/assets/icons/home.svg'
import notificationIcon from '@/assets/icons/notification.svg'
import logoutIcon from '@/assets/icons/logout.svg'
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { useUserAuth } from '@/context/userAuthContext';


interface ISidebarProps {
}

const navItems = [
    {
        name: "Home",
        link: "/",
        icon: homeIcon
    },
    {
        name: "Photos",
        link: "/myphotos",
        icon: photoIcon
    },
    {
        name: "Post",
        link: "#",
        icon: addIcon
    },
    {
        name: "Profile",
        link: "#",
        icon: settingsIcon
    },
    {
        name: "Notification",
        link: "#",
        icon: notificationIcon
    },
    {
        name: "Settings",
        link: "#",
        icon: settingsIcon
    }
]

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
    const location = useLocation();
    const { logout } = useUserAuth();

    return (
        <div className='flex flex-col relative h-screen max-w-sm w-full'>
            <div className='flex justify-center m-5'>
                <div className='text-white text-lg'>Photogram</div>
            </div>
            {navItems.map((item) => {
                return (
                    <div
                        className={cn(
                            buttonVariants({ variant: 'default' }),
                            "flex items-center gap-2 p-2 justify-start ",
                            location.pathname === item.link
                                ? "bg-white text-black rounded-none "
                                : "bg-transparent hover:bg-gray-400 rounded-none"
                        )}
                        key={item.name}
                    >
                        <Link to={item.link} className="flex items-center gap-2 w-full group  hover:text-black">
                            <img
                                src={item.icon}
                                className={cn(
                                    "w-5 h-5 transition duration-100 ",
                                    location.pathname === item.link ? "invert-0" : "invert",
                                    "group-hover:invert-0"

                                )}
                                alt={item.name}
                            />
                            <span>{item.name}</span>
                        </Link>
                    </div>
                )
            })}

            <div
                className={cn(
                    buttonVariants({ variant: 'default' }),
                    "flex items-center gap-2 p-2 justify-start ",
                    location.pathname === "/login"
                        ? "bg-white text-black rounded-none "
                        : "bg-transparent hover:bg-gray-400 rounded-none"
                )}

            >
                <Link to="/login" className="flex items-center gap-2 w-full group  hover:text-black" onClick={logout}>
                    <img
                        src={logoutIcon}
                        className={cn(
                            "w-5 h-5 transition duration-100 ",
                            location.pathname === "/login" ? "invert-0" : "invert",
                            "group-hover:invert-0"

                        )}
                        alt="Logout"
                    />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    )
};

export default Sidebar;
