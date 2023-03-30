// MEDIA - 슬라이드 이미지, 비디오 판별 및 팝업 src 변경
$(document).on('click', '.media__swiper-slide', function (e) {
    let $t = $(this);
    $('.popup-wrap, .popup__media').addClass('-show');
    if ($t.hasClass('photo')) {
        let $imgUrl = $t.find('img').attr('src');
        $('.popup__contents--photo').addClass('-show');
        $('.popup__contents--photo img').attr('src', $imgUrl);
    } else if ($t.hasClass('vod')) {
        let $vodUrl = $t.find('iframe').attr('src');
        $('.popup__contents--vod').addClass('-show');
        $('.popup__contents iframe').attr({
            allowfullscreen: 'true',
            src: $vodUrl
        });
    }
    scrollDisable();
});
// -- MEDIA

// SWIPER
const mediaSwiper = new Swiper('.media__swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    grid: {
        rows: 3
    },
    observeParents: true,
    observer: true,
    navigation: {
        prevEl: '.media__swiper-button.swiper-button-left',
        nextEl: '.media__swiper-button.swiper-button-right'
    },
    breakpoints: {
        768: {
            spaceBetween: 20,
            grid: {
                rows: 2
            },
            slidesPerView: 3,
            slidesPerGroup: 3
        }
    }
});

// POPUP
$(function () {
    let popTarget = document.querySelectorAll('.pop-show'); // 클릭할 버튼요소를 변수 처리
    let popTargetID; // 버튼 클릭시 버튼에 해당하는 팝업의 id값 담는 변수
    let pop = $('.popup-wrap');

    // 팝업 열기
    for (let i = 0; i < popTarget.length; i++) {
        popTarget[i].addEventListener('click', function () {
            popTargetID = this.getAttribute('href');

            pop.addClass('-show');
            $(popTargetID).addClass('-show');

            scrollDisable();
        });
    }

    $('.popup__close').on('click', function () {
        popupClose();
    });
});

// -- POPUP

function popupClose() {
    $('.popup__contents--vod iframe').attr('src', '');
    $('.popup-wrap, .popup, .popup__contents').removeClass('-show');
    scrollAble();
}

// SCROLLABLE FUNCTION
function scrollAble() {
    $('body').removeClass('-noneScroll').off('scroll touchmove mousewheel');
}

function scrollDisable() {
    $('body')
        .addClass('-noneScroll')
        .on('scroll touchmove mousewheel', function (e) {
            e.preventDefault();
        });
}
