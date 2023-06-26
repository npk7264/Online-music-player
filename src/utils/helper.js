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

//lấy top 3 thể loại được nghe nhiều nhất của user
export const getTopGenre = (listGenre, topNumber) => {
  // Chuyển đổi object thành mảng các cặp key-value
  const genreArray = Object.entries(listGenre);
  // Sắp xếp mảng theo số lượt nghe
  const sortedGenre = genreArray.sort((a, b) => b[1] - a[1]);
  // Lấy 3 thể loại có lượt nghe nhiều nhất
  const topGenre = sortedGenre.slice(0, topNumber).map(item => item[0]);
  return topGenre;
}

// convert mã error firebase sang thông báo
export const convertErrorCodeToMessage = (errorCode) => {
  if (errorCode === "auth/email-already-in-use")
    return "Email đã được sử dụng!";
  if (errorCode === "auth/user-not-found") return "Nhập sai email!";
  if (errorCode === "auth/wrong-password") return "Nhập sai mật khẩu!";
  if (errorCode === "auth/invalid-email") return "Email không hợp lệ!";
  if (errorCode === "auth/too-many-requests") return "Quá nhiều yêu cầu!";
  return "Lỗi!";
};