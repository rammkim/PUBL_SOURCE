// 로고 슬라이드
$(function () {
    // 연혁 스크롤 이벤트
    let Controller = new ScrollMagic.Controller({
        container: '.history__list-wrap'
    });

    // 연혁별 날짜 변경
    let _eachHistoryContents = document.querySelectorAll('.history__list');
    for (let i = 0; i < _eachHistoryContents.length; i++) {
        let _HistorYearChange = new ScrollMagic.Scene({
            triggerElement: _eachHistoryContents[i],
            triggerHook: 0
        })

            .setClassToggle(_eachHistoryContents[i], 'active')
            .on('enter leave', function (event) {
                $('.history__year-text').text($('.history__list.active').last().data('year'));
            })
            .addTo(Controller);
    }
});
