import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { TbCoin } from "react-icons/tb";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Navigation = ({ name, entries, onSignOut }) => {

  const navigate = useNavigate();

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
    navigate('/login');
  };


 const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Usage', href: '/usage' },
    { name: 'Plans', href: '/plans' },
  ]

  return (
    <Disclosure as="nav" className="bg-orange-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:mb-24">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-orange-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <IoMenuOutline aria-hidden="currentItem" className="block size-6 group-data-open:hidden" />
              <IoCloseOutline aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <NavLink to="/">
                <Logo align={'h-[32px]'} />
              </NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive ? 'bg-orange-900 text-white' : 'text-white hover:bg-orange-500 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative mr-6">
              <div>
                <MenuButton className="relative flex rounded-full bg-orange-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <div className="bg-slate-50 rounded-full h-[40px] w-[40px] flex items-center justify-center" >
                    <p className="text-2xl font-light">{name[0]}</p>
                  </div>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <p className="block px-4 py-2 text-sm border-b-2">Hi, {name}</p>

                <MenuItem>
                  <button
                    className="block px-4 py-2 text-sm text-gray-900 hover:text-gray-500 data-focus:bg-orange-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="block px-4 py-2 text-sm text-gray-900 hover:text-gray-500 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-900 hover:text-gray-500 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
            <button
              type="button"
              className="relative text-white hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <div className="flex items-center gap-1">
                <TbCoin size={20} />
                <p>{entries}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink}
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-orange-900 text-white' : 'text-white hover:bg-orange-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navigation;