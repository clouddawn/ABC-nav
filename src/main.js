const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);

const hashMap = xObject || [
    {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
    {logo:'B',logoType:'text',url:'https://www.bilibili.com'}
];

const simplifyUrl = (url) => {
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'');//删除 / 开头的内容
}

const render = ()=>{
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class='site'>
                <div class='logo'>${node.logo[0]}</div>
                <div class='link'>${simplifyUrl(node.url)}</div>
                <div class='close'>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                    <style type="text/css">
                        .icon {
                        width: 1.5em; height: 1.5em;
                        vertical-align: -0.15em;
                        fill: currentColor;
                        overflow: hidden;
                        }
                    </style>
                </div>
            </div>
        </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url);
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation();
            hashMap.splice(index,1);
            render();
        });
    });
}
render();

$('.addButton')
    .on('click',()=>{
    let url = window.prompt('你要添加的网址是啥？');
    console.log(typeof url);
    if(url.indexOf('http') !== 0){
        url = 'https://' + url;    
    };
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        logoType:'text',
        url:url
    });
    render();
});

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x',string);
};

$(document).on('keypress',(e)=>{
    const {key} = e;  //const key = e.key的简写
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url);
        }
    }
});