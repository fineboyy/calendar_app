function fillInCalendar() {
    updateCalendarDates()
    var monthToFillIn = {}
    var previousMonthIndex

    month_data.forEach(function (month, i) {
        if (month.year == data.calendar.year && month.month_index == data.calendar.month) {
            monthToFillIn = month
            previousMonthIndex = i - 1
            return
        }
    })

    let days = document.getElementsByTagName("td");
    let currentMonthCount = 1
    let previousMonthCount = month_data[previousMonthIndex].amount_of_days - monthToFillIn.starting_day + 1
    let nextMonthCount = 1
    let uid
    cleanCells(days)

    for (let i = 0; i < days.length; i++) {

        //Fill in current month
        if(monthToFillIn.starting_day <= i && currentMonthCount <= monthToFillIn.amount_of_days) {
            fillPartialMonthData(days[i], currentMonthCount, monthToFillIn, "current")
            currentMonthCount++

        //Fill in previous month
        } else if(currentMonthCount <= monthToFillIn.amount_of_days) {
            fillPartialMonthData(days[i], previousMonthCount, month_data[previousMonthIndex], "previous")
            previousMonthCount++

        //Fill in next month
        } else {
            fillPartialMonthData(days[i], nextMonthCount, month_data[previousMonthIndex + 2 ], "next")
            nextMonthCount++
        }
    }
    changeColor()
}

function fillPartialMonthData(day, count, monthObject, month) {
    day.innerHTML = count

    if(month == "current") {
        if( count == data.current_day.date &&  calendarIsCurrentMonth()) {
            day.setAttribute("id", "current-day")
        }
    } else {
        day.classList.add("color")

        if(month == "previous" && count == monthObject.amount_of_days) {
            day.classList.add("prev-month-last-day")
        }
    }

    uid = getUID(monthObject.month_index, monthObject.year, count)
    day.setAttribute("data-uid", uid)
    appendSpriteToCellAndTooltip(uid, day)
}


function calendarIsCurrentMonth() {
    if(data.current_day.year == data.calendar.year && data.current_day.month == data.calendar.month) {
        return true
    } else {
        return false
    }
}

function getUID(month, year, day) {
    if(month == 12) {
        month = 0
        year++
    }

    return month.toString() + year.toString() + day.toString()
}

function appendSpriteToCellAndTooltip(uid, elem) {
    for(let i = 0; i < post_its.length; i++) {
        if(uid == post_its[i].id) {
            elem.innerHTML+= `<img src = 'images/note-images/note${post_its[i].note_num}.png' alt = "A Post it note">`
            elem.classList.add("tooltip")
            elem.innerHTML += `<span>${post_its[i].note}</span>`
        }
    }
}




function nextMonth () {
    if(data.calendar.month != 11 || data.calendar.year == 2019) {
        data.calendar.month++
    }
    if(data.calendar.month >= 12) {
        data.calendar.month = 0
        data.calendar.year++
    }
    fillInCalendar()
}

function previousMonth(){
    if(data.calendar.month != 11 || data.calendar.year == 2020) {
        data.calendar.month--
    }
    if(data.calendar.month <= -1) {
        data.calendar.month = 11
        data.calendar.year--
    }
    fillInCalendar()
}


function cleanCells(cells) {
    removeCurrentDay()
    for(let i = 0; i < cells.length; i++) {

        removeClass(cells[i], "color")
        removeClass(cells[i], "prev-month-last-day")
        removeClass(cells[i], "tooltip")

        removeAttribute(cells[i], "style")
    }
}

function removeCurrentDay() {
    if(document.getElementById("current-day")) {
        document.getElementById("current-day").removeAttribute("id")
    }
}

document.onkeydown = function(e){
    switch(e.keyCode) {
        case 37: previousMonth(); break
        case 39: nextMonth(); break
    }
}
