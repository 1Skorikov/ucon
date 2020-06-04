import moment from 'moment'

function messageTime(timeString = '') {
  const time = moment(timeString)
  const currentTime = moment()

  let result = time.format('HH:mm')

  if (time.isBefore(currentTime, 'day')) {
    result = 'Gisteren'
  }

  if (
    currentTime.diff(time, 'days') > 1 &&
    currentTime.diff(time, 'days') < 7
  ) {
    result = time.format('dddd')
  }

  if (currentTime.diff(time, 'days') >= 7) {
    result = time.format('DD-MM-YY')
  }

  return result
}

export { messageTime }
