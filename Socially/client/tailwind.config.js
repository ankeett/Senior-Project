/*
Tailwind CSS Configuration
NAME
    Tailwind CSS Configuration
SYNOPSIS
    This file configures the behavior and settings for Tailwind CSS, a utility-first CSS framework.
DESCRIPTION
    - 'corePlugins' is customized to disable 'preflight', which prevents Tailwind from generating base styles.
    - 'content' specifies the files to be scanned for CSS classes by Tailwind.
    - 'important' sets the important class identifier for Tailwind, typically used for overriding styles.
*/

// Your actual configuration code here...


/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins:{
    preflight:false,
  },
  content: ["./src/**/*.{html,js,jsx}"],
  important:"#root",
}
