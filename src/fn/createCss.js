export default () => {
    //opacity: 0;
    //transform: translateZ(0);
    //-webkit-transition-duration: .5s;
    //-moz-transition-duration: .5s;
    //-o-transition-duration: .5s;
    //transition-duration: .5s;
    let createCss = document.createElement('style');
    createCss.innerHTML = `.lazyImg{opacity: 0;
        transform: translateZ(0);
        -webkit-transition-duration: .5s;
        -moz-transition-duration: .5s;
        -o-transition-duration: .5s;
        transition-duration: .5s;
    }`;
    document.body.appendChild(createCss);
};