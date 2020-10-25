//SIDE BAR
const sideBarTexts = document.getElementsByClassName("sideBarText");
const sideBar = document.getElementById("sideBar");
function openSide() {
    sideBar.style.width = "250px";
    for (let i = 0; i < sideBarTexts.length; i++) {
        sideBarTexts[i].style.visibility = "visible";
    }
    sideBar.style.backgroundColor = "#777"
}

function closeSide() {
    sideBar.style.width = "50px";
    for (let i = 0; i < sideBarTexts.length; i++) {
        sideBarTexts[i].style.visibility = "hidden";
    }
    sideBar.style.backgroundColor = null;
}

//CALENDER
const days = document.querySelector(".days");
const month = document.querySelector(".date h1");
const date = document.querySelector(".date p");
const prevMonth = document.querySelector(".prev");
const nextMonth = document.querySelector(".next");
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let currDate = new Date();
let currDayOfWeek = currDate.getDay();
let currDay = currDate.getDate();
let currMonth = currDate.getMonth();
let currYear = currDate.getFullYear();

let selectedDate = currDate;
let selectedDay = currDay;
let selectedMonth = currMonth;
let selectedYear = currYear;

month.textContent = months[currMonth];

date.textContent = currDate.toDateString();
date.dataset.value = selectedDate;

renderCalendar();

nextMonth.addEventListener("click", goToNextMonth);
prevMonth.addEventListener("click", goToPrevMonth);

function goToNextMonth() {
    currMonth++;
    if (currMonth > 11) {
        currMonth = 0;
        currYear++;
    }
    month.textContent = months[currMonth];
    renderCalendar();
}

function goToPrevMonth() {
    currMonth--;
    if (currMonth < 0) {
        currMonth = 11;
        currYear--;
    }
    month.textContent = months[currMonth];
    renderCalendar();
}

function renderCalendar() {
    days.innerHTML = "";
    let amountDays = new Date(currYear, currMonth + 1, 0).getDate();

    let firstDay = new Date(currYear, currMonth, 0).getDay() + 1;
    let amountDaysPrev = new Date(currYear, currMonth, 0).getDate();

    if (firstDay != 7) {
        for (let i = 0; i < firstDay; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.classList.add('prev-date');
            day.textContent = amountDaysPrev - firstDay + i + 1;

            day.addEventListener("click", function () {
                goToPrevMonth();
                selectedDate = new Date(currYear + '-' + (currMonth + 1) + '-' + (amountDaysPrev - firstDay + i + 1));
                selectedDay = amountDaysPrev - firstDay + i + 1;
                selectedMonth = currMonth;
                selectedYear = currYear;

                date.textContent = selectedDate.toDateString();
                date.dataset.value = selectedDate;

                renderCalendar();
            });

            days.appendChild(day);
        }
    }

    for (let i = 0; i < amountDays; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = i + 1;

        if (i + 1 == new Date().getDate() && currMonth == new Date().getMonth() && currYear == new Date().getFullYear()) {
            day.classList.add('today');
        }

        if (selectedDay == (i + 1) && selectedYear == currYear && selectedMonth == currMonth) {
            day.classList.add('selected');
        }

        day.addEventListener("click", function () {

            selectedDate = new Date(currYear + '-' + (currMonth + 1) + '-' + (i + 1));
            selectedDay = i + 1;
            selectedMonth = currMonth;
            selectedYear = currYear;

            date.textContent = selectedDate.toDateString();
            date.dataset.value = selectedDate;

            renderCalendar();
        })

        days.appendChild(day);
    }

    let lastDay = new Date(currYear, currMonth + 1, 0).getDay() + 1;

    if (lastDay != 7) {
        for (let i = 0; i < 7 - lastDay; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.classList.add('next-date');
            day.textContent = i + 1;

            day.addEventListener("click", function () {
                goToNextMonth();
                selectedDate = new Date(currYear + '-' + (currMonth + 1) + '-' + (i + 1));
                selectedDay = i + 1;
                selectedMonth = currMonth;
                selectedYear = currYear;

                date.textContent = selectedDate.toDateString();
                date.dataset.value = selectedDate;

                renderCalendar();
            });

            days.appendChild(day);
        }
    }
}

//LAYOUT OBJECTS
const calendar = document.querySelector(".calendar");
const weekSchedule = document.querySelector(".week-calendar");
const reminder = document.querySelector(".reminder");

//REMINDER
function newEditReminder() {
    const task = document.createElement('div');
    task.classList.add('task');
    task.addEventListener("click", function () {
        const edit = document.querySelector(".reminder .edit-card");
        edit.style.visibility = "visible";
    })
    reminder.appendChild(task);
}

function hideEditReminder() {
    const edit = document.querySelector(".reminder .edit-card");
    edit.style.visibility = "hidden";
}

//WEEK CALENDAR
function newEditWeekCal() {
    const edit = document.querySelector(".week-calendar .edit-card");
    edit.style.visibility = "visible";
}

function hideEditWeekCal() {
    const edit = document.querySelector(".week-calendar .edit-card");
    edit.style.visibility = "hidden";
}

//LAYOUT
// weekSchedule.classList.add('layout');
weekSchedule.classList.add('single-layout');
let numLayout = 1;
let currLayout1 = weekSchedule;
let currLayout2;

function addCalendar() {
    if (!calendar.classList.contains('layout')) {
        if (numLayout == 0) {
            // calendar.classList.add('layout');
            calendar.classList.add('single-layout');
            numLayout++;
            currLayout1 = calendar;
        } else if (numLayout == 1) {
            calendar.classList.add('layout');
            currLayout1.classList.remove('single-layout');
            currLayout1.classList.add('layout');
            numLayout++;
            currLayout2 = calendar;
        } else {
            currLayout1.classList.remove('layout');
            calendar.classList.add('layout');
            currLayout1 = currLayout2;
            currLayout2 = calendar;
        }
    }
}

function addReminder() {
    if (!reminder.classList.contains('layout')) {
        if (numLayout == 0) {
            // reminder.classList.add('layout');
            reminder.classList.add('single-layout');
            numLayout++;
            currLayout1 = reminder;
        } else if (numLayout == 1) {
            reminder.classList.add('layout');
            currLayout1.classList.remove('single-layout');
            currLayout1.classList.add('layout');
            numLayout++;
            currLayout2 = reminder;
        } else {
            currLayout1.classList.remove('layout');
            reminder.classList.add('layout');
            currLayout1 = currLayout2;
            currLayout2 = reminder;
        }
    }
}

function addWeekSchedule() {
    if (!weekSchedule.classList.contains('layout')) {
        if (numLayout == 0) {
            // weekSchedule.classList.add('layout');
            weekSchedule.classList.add('single-layout');
            numLayout++;
            currLayout1 = weekSchedule;
        } else if (numLayout == 1) {
            weekSchedule.classList.add('layout');
            currLayout1.classList.remove('single-layout');
            currLayout1.classList.add('layout');
            numLayout++;
            currLayout2 = weekSchedule;
        } else {
            currLayout1.classList.remove('layout');
            weekSchedule.classList.add('layout');
            currLayout1 = currLayout2;
            currLayout2 = weekSchedule;
        }
    }
}

const objects = document.getElementsByClassName("layout-object");
for (let i = 0; i < objects.length; i++) {
    objects[i].addEventListener("mouseenter", function () {
        if (document.querySelector(".close-button") != null) {
            return;
        }
        let close_button = document.createElement('button');
        close_button.classList.add('close-button');
        let close_icon = document.createElement('i');
        close_icon.classList.add('fas');
        close_icon.classList.add('fa-minus');
        close_button.appendChild(close_icon);
        close_button.addEventListener("click", function () {
            objects[i].classList.remove('layout');
            if (numLayout == 2) {
                if (objects[i] == currLayout1) {
                    currLayout1 = currLayout2;
                }
                currLayout1.classList.add('single-layout');
                currLayout1.classList.remove('layout');
                currLayout2 = null;
            } else {
                objects[i].classList.remove('single-layout');
                currLayout1 = null;
            }
            numLayout--;
        });
        objects[i].insertBefore(close_button, objects[i].firstChild);
    });
    objects[i].addEventListener("mouseleave", function () {
        document.querySelector(".close-button").remove();
    });
}