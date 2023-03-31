$(function () {
    let play = $('.bgm__play');
    let song = [];
    let songArr = ['/resources/bgm/01_bgm.wav', '/resources/bgm/02_bgm.wav', '/resources/bgm/03_bgm.wav', '/resources/bgm/04_bgm.wav', '/resources/bgm/05_bgm.wav', '/resources/bgm/06_bgm.wav', '/resources/bgm/07_bgm.wav', '/resources/bgm/08_bgm.wav', '/resources/bgm/09_bgm.wav'];

    for (let i = 0; i < songArr.length; i++) {
        song[i] = new Audio(songArr[i]);
    }

    play.on('click', function (e) {
        e.preventDefault();

        let audioData = $(this).data('audio');

        // 음악 길이 소숫점 버리기
        let durationMath = Math.floor(song[audioData].duration);

        $('.seek.' + audioData).attr('max', durationMath);

        for (let i = 0; i < 9; i++) {
            song[i].pause();

            song[i].addEventListener(
                'loadeddata',
                function () {
                    document.getElementsByClassName('length')[i].textContent = getTimeCodeFromNum(song.duration);
                },
                false
            );
        }

        song[audioData].play();

        // 음악 업데이트 될때마다 현재시간 value 값에 넣어줌
        song[audioData].addEventListener('timeupdate', function () {
            curtime = parseInt(song[audioData].currentTime, 10);
            $('.seek.' + audioData).val(curtime + 1);
            console.log(audioData, curtime);

            // 음악 종료 시 버튼 변경 및 value 값 초기화
            if (curtime === durationMath) {
                $('.bgm__play ').removeClass('on');
                $('.seek.' + audioData).val(0);
            }
        });

        // 조절 바 컨트롤 - 음악 플레이 위치 변경
        $('.seek.' + audioData).on('input', function () {
            song[audioData].currentTime = $(this).val();
        });

        // 다른 플레이 버튼 눌렀을 때 해당 버튼을 제외한 버튼 전부 플레이 모양으로
        $('.bgm__item').removeClass('on');
        $('.material-icons').text('play_circle');

        // 음악 재생 일시정지 컨트롤
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');

            song[audioData].pause();
        } else {
            $('.bgm__play').removeClass('on');
            $(this).addClass('on');
            $('.bgm__item').eq(audioData).addClass('on');
            $(this).find('span').text('pause_circle');
        }
    });
});

// 음악 길이 함수
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}
