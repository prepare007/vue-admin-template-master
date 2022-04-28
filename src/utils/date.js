// 转为年月日
export var formatDate = function(date) {
  if (date !== '' && date !== undefined && date != null) {
    date = new Date(date)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  } else {
    return ''
  }
}
