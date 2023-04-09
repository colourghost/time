const vancouverCurrentTime = document.querySelector('.vancouver-current-time')
const pattayaCurrentTime = document.querySelector('.pattaya-current-time')
const dougWeek = document.querySelector('.doug-week')
const domWeek = document.querySelector('.dom-week')
const vancouverTime = document.querySelector('.vancouver-time')
const pattayaTime = document.querySelector('.pattaya-time')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const setCurrentTime = _ => {
  const d = new Date()
  let indicator = ''
  let day = d.getUTCDay()
  let hour = d.getUTCHours() - 7
  let minute = d.getUTCMinutes()
  if (minute < 10) minute = '0' + minute
  if (hour < 0) {
    indicator = 'pm'
    hour = hour + 12
    if (day === 0) {
      day = 6
    }
    else {
      day--
    }
  }
  else if (hour < 12) {
    indicator = 'am'
  }
  else if (hour === 12) {
    indicator = 'pm'
  }
  else {
    indicator = 'pm'
    hour = hour - 12
  }
  vancouverCurrentTime.innerText = `${days[day]} ${hour}:${minute} ${indicator}`

  day = d.getUTCDay()
  hour = d.getUTCHours() + 7
  if (hour > 23) {
    indicator = 'am'
    hour = hour - 24
    if (day === 6) {
      day = 0
    }
    else {
      day++
    }
  }
  else if (hour > 12) {
    indicator = 'pm'
    hour = hour - 12
  }
  else if (hour === 12) {
    indicator = 'pm'
  }
  else {
    indicator = 'am'
  }
  pattayaCurrentTime.innerText = `${days[day]} ${hour}:${minute} ${indicator}`
}



const render = _ => {
  let markup = ''
  for (let i = 0; i < 168; i++) {
    markup += '<div></div>'
  }
  dougWeek.innerHTML = markup
  domWeek.innerHTML = markup
}

const attachListeners = _ => {
  let x = 0
  for (let i = 0; i < 168; i++) {
    // DOUG
    dougWeek.children[i].addEventListener('mouseenter', _ => {

        x = i > 13 ? i - 14 : i + 154

        dougWeek.children[i].style.borderLeft = '2px solid black'
        if (i > 13) domWeek.children[i - 14].style.borderLeft = '2px solid black'

        if (i < 12) {
          pattayaTime.innerText = `${getDay(i)} ${i}:00 am`
        }
        else if (i % 24 === 0) {
          pattayaTime.innerText = `${getDay(i)} 0:00 am`
        }
        else if (i % 12 === 0) {
          pattayaTime.innerText = `${getDay(i)} Noon`
        }
        else {
          pattayaTime.innerText = `${getDay(i)} ${i % 12}:00 ${Math.floor(i / 12) % 2 == 0 ? 'am' : 'pm'}`
        }

        if (x < 12) {
          vancouverTime.innerText = `${getDay(x)} ${x}:00 am`
        }
        else if (x % 24 === 0) {
          vancouverTime.innerText = `${getDay(x)} 0:00 am`
        }
        else if (x % 12 === 0) {
          vancouverTime.innerText = `${getDay(x)} Noon`
        }
        else {
          vancouverTime.innerText = `${getDay(x)} ${x % 12}:00 ${Math.floor(x / 12) % 2 == 0 ? 'am' : 'pm'}`
        }
    })
    dougWeek.children[i].addEventListener('mouseleave', _ => {
        dougWeek.children[i].style.borderLeft = 'none'
        if (i > 13) domWeek.children[i - 14].style.borderLeft = 'none'
    })

    // DOM
    domWeek.children[i].addEventListener('mouseenter', _ => {

        x = i < 154 ? i + 14 : i - 154

        domWeek.children[i].style.borderLeft = '2px solid black'
        if (i < 154) dougWeek.children[i + 14].style.borderLeft = '2px solid black'

        if (i < 12) {
          vancouverTime.innerText = `${getDay(i)} ${i}:00 am`
        }
        else if (i % 24 === 0) {
          vancouverTime.innerText = `${getDay(i)} 0:00 am`
        }
        else if (i % 12 === 0) {
          vancouverTime.innerText = `${getDay(i)} Noon`
        }
        else {
          vancouverTime.innerText = `${getDay(i)} ${i % 12}:00 ${Math.floor(i / 12) % 2 == 0 ? 'am' : 'pm'}`
        }

        if (x < 12) {
          pattayaTime.innerText = `${getDay(x)} ${x}:00 am`
        }
        else if (x % 24 === 0) {
          pattayaTime.innerText = `${getDay(x)} 0:00 am`
        }
        else if (x % 12 === 0) {
          pattayaTime.innerText = `${getDay(x)} Noon`
        }
        else {
          pattayaTime.innerText = `${getDay(x)} ${x % 12}:00 ${Math.floor(x / 12) % 2 == 0 ? 'am' : 'pm'}`
        }
    })
    domWeek.children[i].addEventListener('mouseleave', _ => {
        domWeek.children[i].style.borderLeft = 'none'
        if (i < 154) dougWeek.children[i + 14].style.borderLeft = 'none'
    })
  }
}

const getDay = i => {
  return days[Math.floor(i / 24)]
}

setCurrentTime()
setInterval(setCurrentTime, 2000);
render()
attachListeners()