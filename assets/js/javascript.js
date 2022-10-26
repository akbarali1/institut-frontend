/**
 * Created by PhpStorm.
 * Filename: javascript.js
 * Project Name: vuejwtlaravel.loc
 * User: Akbarali
 * Date: 21/08/2021
 * Time: 11:42 AM
 * Github: https://github.com/akbarali1
 * Telegram: @kbarali
 * E-mail: akbarali@webschool.uz
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(event => {
        console.log('Service worker registered', event);
    });;
}
const pagelink = window.location.href;

function reload(name1, name2) {
    window.setTimeout(function () {
        var reload_page = window.location.href = name2;
    }, name1);
    return reload_page;
}
//Keshlarni tozalash uchun
// if ('serviceWorker' in navigator) {
//     caches.keys().then(function(cacheNames) {
//         cacheNames.forEach(function(cacheName) {
//             caches.delete(cacheName);
//         });
//     });
// }
