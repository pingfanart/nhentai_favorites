const BASE_URL="http://49.232.237.42:8556/";
//const BASE_URL="http://localhost:8556/";
window.onload=()=>{
    let favoriteDiv= document.getElementById("favcontainer");
    let user_name= document.getElementById("user_name");
    console.log(favoriteDiv)
    var location_search = new URLSearchParams(document.location.search);
    var page = location_search.get('page');
    var id = location_search.get('id');
    page=page==null?1:page;
    console.log(id)
    fetch(BASE_URL+"api/query?id="+id)
    .then(data=>data.json())
    .then(data=>{
        let favorites = JSON.parse(data.favorites);
        user_name.innerHTML='<i class="fa fa-heart color-icon"></i>'+data.name;
        console.log(favorites)
        for(const i of favorites[page-1]){
            favoriteDiv.appendChild(new_gallery(i.href,i.caption,i.cover,i.tags))
        }
        favoriteDiv.appendChild(pagination(favorites.length,page,id))
    })
}

function new_gallery(href,caption,cover,tags){

    // 创建一个新的 div 元素
    var newDiv = document.createElement('div');

    // 设置 div 元素的 class
    newDiv.className = 'gallery';

    // 设置 div 元素的 data-tags
    newDiv.setAttribute('data-tags', tags);

    // 设置 div 元素的内容
    newDiv.innerHTML = '<a href="' + href + '" class="cover" style="padding:0 0 139.2% 0"><img class="lazyload" width="250" height="348" data-src="' + cover + '" src="' + cover + '"><noscript><img src="' + cover + '" width="250" height="348"  /></noscript><div class="caption">' + caption + '</div></a>';

    return newDiv

}

function pagination(pages,page_,id){
    var path = window.location.origin+window.location.pathname;
    // 创建分页元素
    var paginationSection = document.createElement('section');
    paginationSection.className = 'pagination';

    var page = parseInt(page_)
    console.log(page)
    if(page!=1){
    // 创建第一页链接
    var firstPageLink = document.createElement('a');
    firstPageLink.href =path+ '?page=1' +"&id="+id;
    firstPageLink.className = 'last';
    var firstPageIcons = document.createElement('span');
    firstPageIcons.innerHTML = '<i class="fa fa-chevron-left"></i><i class="fa fa-chevron-left"></i>';
    firstPageLink.appendChild(firstPageIcons);
    paginationSection.appendChild(firstPageLink);
    // 创建上一页链接
    var prevPageLink = document.createElement('a');
    prevPageLink.href = path+'?page='+(page-1)+"&id="+id;
    prevPageLink.className = 'next';
    var prevPageIcon = document.createElement('i');
    prevPageIcon.className = 'fa fa-chevron-left';
    prevPageLink.appendChild(prevPageIcon);
    paginationSection.appendChild(prevPageLink);


    }

    // 创建分页链接
    for (var i = 1; i <= pages; i++) {
        var pageLink = document.createElement('a');
        pageLink.href = path+'?page=' + i+"&id="+id;
        pageLink.className = 'page' + (i == page ? ' current' : ''); // 第一页添加 current 类
        pageLink.textContent = i;
        paginationSection.appendChild(pageLink);
    }
    if(page!=pages){
    // 创建下一页链接
    var nextPageLink = document.createElement('a');
    nextPageLink.href = path+'?page='+(page+1)+"&id="+id; // 下一页链接指向第二页
    nextPageLink.className = 'next';
    var nextPageIcon = document.createElement('i');
    nextPageIcon.className = 'fa fa-chevron-right';
    nextPageLink.appendChild(nextPageIcon);
    paginationSection.appendChild(nextPageLink);

    // 创建最后一页链接
    var lastPageLink = document.createElement('a');
    lastPageLink.href =path+ '?page='+pages+"&id="+id; // 最后一页链接指向第三页
    lastPageLink.className = 'last';
    var lastPageIcons = document.createElement('span');
    lastPageIcons.innerHTML = '<i class="fa fa-chevron-right"></i><i class="fa fa-chevron-right"></i>';
    lastPageLink.appendChild(lastPageIcons);
    paginationSection.appendChild(lastPageLink);
    }
    return paginationSection
}