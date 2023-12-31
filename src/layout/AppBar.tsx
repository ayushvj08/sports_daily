import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/theme/context";

const navigation = [
  { name: "Dashboard", href: "/home/articles", current: true },
  { name: "Team", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AppBar = () => {
  const { theme, switchTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === "light") {
      switchTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      switchTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <Disclosure as="nav" className={`${theme} dark:bg-gray-900 bg-gray-400`}>
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    className="relative inline-flex items-center justify-center rounded-md p-2 
                  text-gray-300 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="hidden sm:block h-8 w-auto"
                      height={8}
                      width={8}
                      src="/favicon.ico"
                      // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Sports Daily Logo"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? ` ${theme} dark:bg-gray-900 bg-gray-400 `
                              : "text-gray-200 hover:bg-gray-500 ",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={"/home/articles"}
                    className={`pr-8 mx-auto font-serif text-3xl font-semibold cursor-pointer`}
                  >
                    Sports Daily
                  </Link>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Theme Switcher */}
                  <button
                    type="button"
                    // bg-gray-800 p-1 text-gray-400
                    className="relative rounded-full p-1 hover:text-white
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span
                      className="absolute -inset-1.5"
                      onClick={toggleTheme}
                    />
                    <span className="sr-only">Switch Theme</span>
                    {theme === "light" ? (
                      <SunIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                        onClick={() => console.log("from light theme")}
                      />
                    ) : (
                      <MoonIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Cog6ToothIcon
                          className="m-1 text-white  h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className={`${theme} dark:bg-gray-900 dark:text-white absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                      >
                        <Menu.Item>
                          {({ active }) =>
                            localStorage.getItem("authToken") ? (
                              <Link
                                to={"articles/preferences"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-500"
                                )}
                              >
                                Preferences
                              </Link>
                            ) : (
                              <></>
                            )
                          }
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) =>
                            localStorage.getItem("authToken") ? (
                              <Link
                                to={"change_password"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-500"
                                )}
                              >
                                Change Password
                              </Link>
                            ) : (
                              <></>
                            )
                          }
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) =>
                            localStorage.getItem("authToken") ? (
                              <Link
                                to={"/logout"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-500"
                                )}
                              >
                                Sign out
                              </Link>
                            ) : (
                              <Link
                                to={"/signin"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-500"
                                )}
                              >
                                Sign in
                              </Link>
                            )
                          }
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-500 text-white"
                        : "text-gray-300 hover:bg-gray-400 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Outlet />
    </>
  );
};
export default AppBar;
