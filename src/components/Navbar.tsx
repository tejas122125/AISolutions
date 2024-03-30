import React from 'react'
import ModeToggle from './Modetoggle'
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen px-4 py-2 z-50 transition-all duration-300 bg-transparent border-y-4">
      <div className="flex flex-row justify-between items-center w-full">
        <div className='flex flex-row justify-evenly items-center gap-4'>
          <a href="#" className="text-xl font-bold text-white">Brand Name</a>

          <ul className="hidden md:flex space-x-4 dark:text-white">
            <li><a href="#" className="hover:dark:text-gray-400 hover:text-black text-lg font-semibold">Home</a></li>
            <li><a href="#" className="hover:dark:text-gray-400  hover:text-black text-lg font-semibold">About</a></li>
            <li>
              <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="dark:text-white text-black bg-pink-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Technologies <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
              </svg>
              </button>

              <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                  </li>
                </ul>
              </div>

            </li>
            <li><a href="#" className="hover:dark:text-gray-400 font-semibold hover:text-black">Contact</a></li>
          </ul>
        </div>
        <div>
          <ul className='hidden md:flex flex-row space-x-4 dark:text-white'>
            <li><Button className='bg-blue-400 dark:text-white text-black hover:bg-blue-300 hover:dark:bg-blue-700 '>Button</Button></li>
            <li><ModeToggle /></li>

          </ul>
        </div>
        <div className='flex md:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger><button id="menu-toggle" className="md:hidden right-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16v12H4zm-2-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path></svg>
            </button></DropdownMenuTrigger>
            <DropdownMenuContent className='mt-1 dark:bg-black md:hidden'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar