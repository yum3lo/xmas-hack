import { Snowflake, Menu, Search, User, FilePenLine, SquareLibrary, Folder, LayoutTemplate, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after logout
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Snowflake className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Fairy Desk</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost"> 
            <SquareLibrary className="h-5 w-5"/>
            <Link href="/glossary">Glossary</Link>
          </Button>
          {/* {isAuthenticated && ( */}
            <Button variant="ghost"> 
              <Folder className="h-5 w-5"/>
              <Link href="/docs">My docs</Link>
            </Button>
          {/* )} */}
          <Button variant="ghost">
            <LayoutTemplate className="h-5 w-5"/>
            <Link href="/template">Templates</Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={"/avatar.png"} alt={"Avatar"} />
                    <AvatarFallback>{"example@email.com"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{"example@email.com"}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex w-full cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default"> 
              <Link href="/login">Login</Link><User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}