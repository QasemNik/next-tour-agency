import Cookies from "js-cookie";

const COOKIES_OPTION = {
    path: "/",
    secure: process.env.NODE_ENV === 'production',
    sameSite: "lax",
}

export function setCookie(name, value, days = 30) {
    Cookies.set(name, value, {
        expires: days,
        ...COOKIES_OPTION
    })
}

export function getCookie(name) {
    return Cookies.get(name)
}

export function removeCookie(name) {
    Cookies.remove(name, {path:"/"})
}


export function setAuthCookies({ accessToken, refreshToken }) {
    setCookie("accessToken", accessToken, 1)
    setCookie("refreshToken", refreshToken, 30)
}