# Introduction
This is a document to help the user understand the structure and design of the UX/UI redesign as well as some additional helpers that have been implemented to help with maintenance on a long term basis.

# Libraries, libraries, libraries

## UI Library
For the frontend library, we have opted to go with [Mantine](https://mantine.dev/) for the frontend library.  It has a nice minimalistic base with some nicely designed components that also over theming via an easy to use API with access to the all the HTML elements used in the prebuilt components. 

## Recoil
State management is a real pain in the ass in general, so we opted for a library called [Recoil](https://recoiljs.org/) to make our pains disappear.  It has a much simpler setup than Redux and also offers hooks that mirror the React hooks. It is an open source project from the people who brought you React.

## React Icons
Hey, everyone needs icons.  This library has a bunch. ES6 though so it won't try to melt your page loading every icon ever made.

[React Icons](https://react-icons.github.io/react-icons/)

# Design Goal
The hope is that this can provide components that are easy to navigate, understand, and implement elsewhere in the project if need be.


