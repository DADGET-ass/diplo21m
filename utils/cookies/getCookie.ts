export const getCookie = (name: string, cookie?: string) => {
    if (!cookie) {
        cookie = document.cookie
    }
    let matches = cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    const result = matches ? decodeURIComponent(matches[1]) : undefined;
    return result
}