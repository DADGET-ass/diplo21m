export const setCookie = (cname: string, cvalue: string,days=1) => {
    const d = new Date();
    d.setTime(d.getTime() + days*24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}