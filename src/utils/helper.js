//hàm tính value cho thanh slider
export const convertValueSlider = (playbackPosition, playbackDuration) => {
  if (playbackPosition !== null && playbackDuration !== null)
    return playbackPosition / playbackDuration;
  return 0;
};

// hàm chuyển đổi định dạng thời gian
export const convertTime = (milliseconds) => {
  if (milliseconds) {
    //const hours = Math.floor(milliseconds / 3600000);
    const minute = Math.floor((milliseconds % 3600000) / 60000);
    const sec = Math.floor(((milliseconds % 360000) % 60000) / 1000);
    if (parseInt(minute) < 10 && sec < 10) return `0${minute}:0${sec}`;
    if (sec == 60)
      return parseInt(minute) + 1 < 10
        ? `0${parseInt(minute) + 1}:00`
        : `${parseInt(minute) + 1}:00`;
    if (parseInt(minute) < 10) return `0${minute}:${sec}`;
    if (sec < 10) return `${minute}:0${sec}`;
    return `${minute}:${sec}`;
  }
  return `00:00`;
};
