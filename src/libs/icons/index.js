import React from "react"

export const Radar = ({ size }) => (
  <svg height={size} width={size} viewBox="0 0 297 297" xmlns="http://www.w3.org/2000/svg">
    <path d="m148.5 112.16c-20.038 0-36.341 16.303-36.341 36.341s16.303 36.341 36.341 36.341 36.341-16.303 36.341-36.341-16.303-36.341-36.341-36.341zm0 51.766c-8.505 0-15.425-6.92-15.425-15.425s6.92-15.426 15.425-15.426 15.425 6.921 15.425 15.426-6.92 15.425-15.425 15.425z" />
    <path d="m148.5 60.394c-4.593 0-9.104 0.355-13.509 1.035-5.085-5.909-12.611-9.663-21.002-9.663-15.281 0-27.713 12.432-27.713 27.713 0 2.085 0.239 4.111 0.677 6.066-16.372 16.002-26.56 38.305-26.56 62.955 0 48.582 39.523 88.106 88.106 88.106s88.106-39.524 88.106-88.106-39.522-88.106-88.105-88.106zm-34.511 12.288c3.748 0 6.798 3.049 6.798 6.797s-3.05 6.798-6.798 6.798-6.797-3.05-6.797-6.798c0-3.749 3.049-6.797 6.797-6.797zm34.511 143.01c-37.05 0-67.191-30.143-67.191-67.191 0-17.587 6.802-33.607 17.904-45.594 4.281 2.71 9.347 4.285 14.776 4.285 14.544 0 26.499-11.264 27.619-25.525 2.266-0.234 4.564-0.357 6.892-0.357 37.05 0 67.191 30.142 67.191 67.191s-30.141 67.191-67.191 67.191z" />
    <path d="m297 79.479c0-15.281-12.432-27.713-27.713-27.713-2.552 0-5.021 0.354-7.368 1.003-27.262-32.248-67.984-52.769-113.42-52.769-81.883 0-148.5 66.617-148.5 148.5 0 45.434 20.521 86.157 52.768 113.42-0.649 2.349-1.002 4.818-1.002 7.369 0 15.281 12.433 27.713 27.713 27.713 7.77 0 14.798-3.218 19.834-8.386 15.402 5.424 31.955 8.386 49.187 8.386 81.883 0 148.5-66.617 148.5-148.5 0-17.234-2.961-33.785-8.386-49.187 5.168-5.036 8.386-12.065 8.386-19.834zm-20.915 0c0 3.748-3.05 6.798-6.798 6.798s-6.798-3.05-6.798-6.798 3.05-6.797 6.798-6.797 6.798 3.048 6.798 6.797zm-196.61 196.6c-3.748 0-6.797-3.049-6.797-6.797s3.049-6.798 6.797-6.798 6.798 3.05 6.798 6.798c-1e-3 3.748-3.05 6.797-6.798 6.797zm69.021 0c-14.453 0-28.347-2.425-41.311-6.875-0.042-15.245-12.455-27.635-27.711-27.635-5.077 0-9.837 1.379-13.934 3.772-27.3-23.417-44.63-58.143-44.63-96.847 0-70.351 57.234-127.58 127.58-127.58 38.704 0 73.43 17.328 96.847 44.629-2.395 4.098-3.772 8.856-3.772 13.934 0 15.256 12.391 27.67 27.636 27.711 4.449 12.963 6.875 26.857 6.875 41.311 0 70.351-57.234 127.58-127.58 127.58z" />
  </svg>
)

export const ChevronRight = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="chevron-right">
        <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
        <path d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z" />
      </g>
    </g>
  </svg>
)

export const Location = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="navigation-2">
        <rect width="24" height="24" opacity="0" />
        <path d="M13.67 22h-.06a1 1 0 0 1-.92-.8l-1.54-7.57a1 1 0 0 0-.78-.78L2.8 11.31a1 1 0 0 1-.12-1.93l16-5.33A1 1 0 0 1 20 5.32l-5.33 16a1 1 0 0 1-1 .68z" />
      </g>
    </g>
  </svg>
)

export const Identifier = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="credit-card">
        <rect width="24" height="24" opacity="0" />
        <path d="M19 5H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-8 10H7a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zm6 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm3-6H4V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z" />
      </g>
    </g>
  </svg>
)

export const PlusCircle = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="plus-circle">
        <rect width="24" height="24" opacity="0" />
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <path d="M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2z" />
      </g>
    </g>
  </svg>
)

export const Back = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="arrow-back">
        <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0" />
        <path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z" />
      </g>
    </g>
  </svg>
)

export const MoreVertical = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="more-vertical">
        <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="19" r="2" />
      </g>
    </g>
  </svg>
)

export const Settings = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="settings">
        <rect width="24" height="24" opacity="0" />
        <path
          d="M8.61 22a2.25 2.25 0 0 1-1.35-.46L5.19 20a2.37 2.37 0 0 1-.49-3.22 2.06 2.06 0 0 0 .23-1.86l-.06-.16a1.83 1.83 0 0 0-1.12-1.22h-.16a2.34 2.34 0 0 1-1.48-2.94L2.93 8a2.18 2.18 0 0 1 1.12-1.41 2.14 2.14 0 0 1 1.68-.12 1.93 1.93 0 0 0 1.78-.29l.13-.1a1.94 1.94 0 0 0 .73-1.51v-.24A2.32 2.32 0 0 1 10.66 2h2.55a2.26 2.26 0 0 1 1.6.67 2.37 2.37 0 0 1 .68 1.68v.28a1.76 1.76 0 0 0 .69 1.43l.11.08a1.74 1.74 0 0 0 1.59.26l.34-.11A2.26 2.26 0 0 1 21.1 7.8l.79 2.52a2.36 2.36 0 0 1-1.46 2.93l-.2.07A1.89 1.89 0 0 0 19 14.6a2 2 0 0 0 .25 1.65l.26.38a2.38 2.38 0 0 1-.5 3.23L17 21.41a2.24 2.24 0 0 1-3.22-.53l-.12-.17a1.75 1.75 0 0 0-1.5-.78 1.8 1.8 0 0 0-1.43.77l-.23.33A2.25 2.25 0 0 1 9 22a2 2 0 0 1-.39 0zM4.4 11.62a3.83 3.83 0 0 1 2.38 2.5v.12a4 4 0 0 1-.46 3.62.38.38 0 0 0 0 .51L8.47 20a.25.25 0 0 0 .37-.07l.23-.33a3.77 3.77 0 0 1 6.2 0l.12.18a.3.3 0 0 0 .18.12.25.25 0 0 0 .19-.05l2.06-1.56a.36.36 0 0 0 .07-.49l-.26-.38A4 4 0 0 1 17.1 14a3.92 3.92 0 0 1 2.49-2.61l.2-.07a.34.34 0 0 0 .19-.44l-.78-2.49a.35.35 0 0 0-.2-.19.21.21 0 0 0-.19 0l-.34.11a3.74 3.74 0 0 1-3.43-.57L15 7.65a3.76 3.76 0 0 1-1.49-3v-.31a.37.37 0 0 0-.1-.26.31.31 0 0 0-.21-.08h-2.54a.31.31 0 0 0-.29.33v.25a3.9 3.9 0 0 1-1.52 3.09l-.13.1a3.91 3.91 0 0 1-3.63.59.22.22 0 0 0-.14 0 .28.28 0 0 0-.12.15L4 11.12a.36.36 0 0 0 .22.45z"
          data-name="&lt;Group&gt;"
        />
        <path d="M12 15.5a3.5 3.5 0 1 1 3.5-3.5 3.5 3.5 0 0 1-3.5 3.5zm0-5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z" />
      </g>
    </g>
  </svg>
)

export const Home = ({ size }) => (
  <svg
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z" />
  </svg>
)

export const Info = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="info">
        <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <circle cx="12" cy="8" r="1" />
        <path d="M12 10a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1z" />
      </g>
    </g>
  </svg>
)

export const Search = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="search">
        <rect width="24" height="24" opacity="0" />
        <path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" />
      </g>
    </g>
  </svg>
)

export const Close = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="close">
        <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
        <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
      </g>
    </g>
  </svg>
)

export const Plus = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="plus">
        <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
        <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
      </g>
    </g>
  </svg>
)

export const ChevronDown = ({ size }) => (
  <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="chevron-down">
        <rect width="24" height="24" opacity="0" />
        <path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z" />
      </g>
    </g>
  </svg>
)
