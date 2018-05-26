let formateDate = (millSeconds) => {
  if (!millSeconds) {
    return ''
  } else {
    let date = new Data(millSeconds)
    let str = '';
    str += date.getFullYear() + '-';
    str += ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    str += (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    str += (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    str += (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    str += (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return str;
  }
}

export {
  formateDate
}