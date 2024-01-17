// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  colors: {
    'darkblue':'#101360ee' ,
    'blue': '#427D9D', 
    'softblue':'#9BBEC8',
    'skyblue' :'#DDF2FD',
    'primaryblue':'#02023b',
    'primarywhite': '#FFFDF9',
    'white' : '#FFFFFF',
    'mainblack':'#323131',
    'red':'#CD1818',
    'gary':'#e9e9e9f4',
    'pink':'#D0A2F7',
    'orange':'#FF9B50'
  },
}; 
export const plugins = [nextui()];