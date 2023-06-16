// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Nazareva Anna
// @match        https://www.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["Как использовать devtools браузера", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let btnK = document.getElementById("search_icon");
let bingInput = document.getElementsByName("q")[0];

if(btnK != null) {
    let i = 0;
    let timerId = setInterval(() => {
        bingInput.value += keyword[i];
        i++;
        if(i == keyword.length) {
            clearInterval(timerId);
            btnK.click();
        }
    }, 500);
} else if(location.hostname == "napli.ru") {
    console.log("мы на целевом сайте");
    setInterval(() => {
        let index = getRandom(0, links.length);
        if(getRandom(0, 101) >= 70) {
            location.href = "https://www.bing.com/";
        }
        if(links[index].href.indexOf("napli.ru") != -1) links[index].click()
    }, getRandom(2000, 5000))
} else {
    let nextBingPage = true;
    for(let i = 0; i < links.length; i++) {
        if (links[i].href.indexOf("napli.ru") != -1) {
            let link = links[i];
            nextBingPage = false;
            console.log("нашел " + link);
            setTimeout(() => {
                link.click();
            }, getRandom(2000, 5000))
            break;
        }
    }
    let elementExist = setInterval(() => {
        let element = document.getElementsByClassName("sb_pagS sb_pagS_bp b_widePag sb_bp")[0];
        if (element != null) {
            if(element.innerText == "4") {
                nextBingPage = false;
                location.href = "https://www.bing.com/";
            }
            clearInterval(elementExist);
        }
    }, 100)

    if(nextBingPage) {
        setTimeout(() => {
            document.getElementsByClassName("sw_next")[0].click();
        }, getRandom(3000, 8000))
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
