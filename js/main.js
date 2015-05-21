console.log('loaded...');

var currentDate = new Date(Date.now());
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

setCalendar(currentMonth, currentYear);
setYear(currentYear);

$('.calendar').text(monthToString(currentMonth) + " " + currentDate.getDate());


// Click on today
$('.today').on('click', function(event) {
	currentDate = new Date(Date.now());
	currentMonth = currentDate.getMonth();
	currentYear = currentDate.getFullYear();
	setCalendar(currentMonth, currentYear);
	// $('.yy').removeClass('active');
	// $('.mnth').removeClass('active');
	document.getElementById("dataTableDate").style.display="table";
    document.getElementById("datesTable").style.display="table";
    document.getElementById("dataTableYear").style.display="none";
    document.getElementById("monthsTable").style.display="none";
    document.getElementById("dataTableYears").style.display="none";
    document.getElementById("yearsTable").style.display="none";
});

// Click on months table
$('.mnth').each(function(index, item) {
	$(item).on('click', function(event) {
	$('.mnth').removeClass('active');
	$(this).addClass('active');
	currentMonth = index;
	setCalendar(currentMonth, currentYear);
    document.getElementById("dataTableYear").style.display="none";
    document.getElementById("monthsTable").style.display="none";
	document.getElementById("dataTableDate").style.display="table";
    document.getElementById("datesTable").style.display="table";
});
});

// Click on years table
$('.yy').each(function(index, item) {
	$(item).on('click', function(event) {
	$('.yy').removeClass('active');
	$(this).addClass('active');
	currentYear = parseInt($(item).text());
	setCalendar(currentMonth, currentYear);
    document.getElementById("dataTableYears").style.display="none";
    document.getElementById("yearsTable").style.display="none";	
	document.getElementById("dataTableYear").style.display="table";
    document.getElementById("monthsTable").style.display="table";
});
});

// Click on previous month item
$('.prevMonth').on('click', function(event) {
	$('.yy').removeClass('active');
	$('.mnth').removeClass('active');
	if (currentMonth == 0) {
	 	currentMonth =11;
	 	currentYear-= 1;
	}
	else{
		currentMonth-=1;
	}
	setCalendar(currentMonth, currentYear);
});

// Click on next month item
$('.nextMonth').on('click', function(event) {
	$('.yy').removeClass('active');
	$('.mnth').removeClass('active');
	if (currentMonth == 11) {
	 	currentMonth =0;
	 	currentYear+=1;
	}
	else{
		currentMonth+=1;
	}
	setCalendar(currentMonth, currentYear);
});

// Click on previous year item
$('.prevYear').on('click', function(event) {
	$('.yy').removeClass('active');
		currentYear-=1;
		$('.month').text(monthToString(currentMonth) + " " + currentYear);
		$('.year').text(currentYear);
		setYear(currentYear);
		setCalendar(currentMonth, currentYear);
});

// Click on next year item
$('.nextYear').on('click', function(event) {
	$('.yy').removeClass('active');
		currentYear+=1;
		$('.month').text(monthToString(currentMonth) + " " + currentYear);
		$('.year').text(currentYear);
		setYear(currentYear);
		setCalendar(currentMonth, currentYear);
});

// Click on previous years item
$('.prevYears').on('click', function(event) {
	currentYear -= 16;
	setYear(currentYear);
});

// Click on next years item

$('.nextYears').on('click', function(event){
	currentYear += 16;
	setYear(currentYear);
});

// dayOfYear function returns the number of date in year ( 1 - 366)
function dayOfYear(date) {
	start = new Date(date.getFullYear(), 0, 0);
	diff = date- start;
	oneDay = 1000 * 60 * 60 * 24;
	day = Math.round(diff / oneDay);
	return day;
}

// show days table
$('.showCalendar').on('click', function(event) {
	if (document.getElementById("datesTable").style.display=="table" || 
		document.getElementById("monthsTable").style.display=="table" ||
		document.getElementById("yearsTable").style.display=="table") {
	    document.getElementById("dataTableDate").style.display="none";
        document.getElementById("datesTable").style.display="none";
       	document.getElementById("dataTableYear").style.display="none";
        document.getElementById("monthsTable").style.display="none";
        document.getElementById("dataTableYears").style.display="none";
        document.getElementById("yearsTable").style.display="none";
        document.getElementById("today").style.display="none";
	}
	else{
		$('.yy').removeClass('active');
		$('.mnth').removeClass('active');
		currentDate = new Date(Date.now());
		currentMonth = currentDate.getMonth();
		currentYear = currentDate.getFullYear();
		setCalendar(currentMonth, currentYear);
	    document.getElementById("dataTableDate").style.display="table";
        document.getElementById("datesTable").style.display="table";
        document.getElementById("today").style.display="table";

    }
})

// show months table
$('.month').on('click', function(event) {
	    document.getElementById("dataTableDate").style.display="none";
        document.getElementById("datesTable").style.display="none";
       	document.getElementById("dataTableYear").style.display="table";
        document.getElementById("monthsTable").style.display="table";
})

// show years table
$('.year').on('click', function(event) {
	    document.getElementById("dataTableYear").style.display="none";
        document.getElementById("monthsTable").style.display="none";
       	document.getElementById("dataTableYears").style.display="table";
        document.getElementById("yearsTable").style.display="table";
})

// displays the calendar for receipted month and year
function setCalendar(month, year){
	// creation of array: days of month like 1, 2, ..., 31, 1, 2,..., 28, 1,... from 26 Dec
	var arrayMonthDays = [];
 	for (var i = 0; i < 400; i++) {
 		tempDate =  new Date(year - 1, 11, 26 + i);
 		arrayMonthDays[i] = tempDate.getDate();
 	};
 	// tempDate2 is the first day of receipted month
	tempDate2 =  new Date(year, month, 1);
	// shift -1 = start array from 0
	// shift +6 = 26, 27, 28, 29, 30, 31 Dec, where arrayMonthDays started
	// shift +7*i = 7 days * number of week that calculated
	$('.firstWeek').each(function(index, item){
		$(item).text(arrayMonthDays[dayOfYear(tempDate2) - 1 + 6 + 7 * 0 + index - tempDate2.getDay()]);
	});
	$('.secondWeek').each(function(index, item){
		$(item).text(arrayMonthDays[dayOfYear(tempDate2) + 5 + 7 * 1 + index - tempDate2.getDay()]);
	})
	$('.thirdWeek').each(function(index, item){
		$(item).text(arrayMonthDays[dayOfYear(tempDate2) + 5 + 7 * 2 + index - tempDate2.getDay()]);
	})
	$('.fourthWeek').each(function(index, item){
		$(item).text(arrayMonthDays[dayOfYear(tempDate2) + 5 + 7 * 3 + index - tempDate2.getDay()]);
	})
	$('.fifthWeek').each(function(index, item){
		$(item).text(arrayMonthDays[dayOfYear(tempDate2) + 5 + 7 * 4 + index - tempDate2.getDay()]);
	})
	$('.sixthWeek').each(function(index, item){
		$(item).text(arrayMonthDays[dayOfYear(tempDate2) + 5 + 7 * 5 + index - tempDate2.getDay()]);
	})
	$('.month').text(monthToString(month) + " " + currentYear);
	$('.year').text(year);
	setYear(currentYear);
	$('.mnth').each(function(index, item){
		if (index == currentMonth) {
			$(this).addClass('active');
		};
	});
	$('.firstWeek').each(function(index,item) {
		if ($(item).text() > index + 1) {
			document.getElementById(index).style.color = "#9E9494";
		}
		else{
			document.getElementById(index).style.color = "white";
		}
	});
	$('.fifthWeek').each(function(index,item) {
		if ($(item).text() < 23) {
			document.getElementById(index+"5").style.color = "#9E9494";
		}
		else{
			document.getElementById(index+"5").style.color = "white";
		}
	});
	$('.sixthWeek').each(function(index,item) {
		if ($(item).text() < 23) {
			document.getElementById(index+"6").style.color = "#9E9494";
		}
		else{
			document.getElementById(index+"6").style.color = "white";
		}
	});
	if (currentDate.getDate() <= 14) {
		$('.firstWeek').each(function(index, item) {
			if ($(item).text() == currentDate.getDate()) {
				$('.firstWeek').removeClass('active');
				$('.secondWeek').removeClass('active');
				$(this).addClass('active');
			};
		});
		$('.secondWeek').each(function(index, item) {
			if ($(item).text() == currentDate.getDate()) {
				$('.firshWeek').removeClass('active');
				$('.secondWeek').removeClass('active');
				$('.thirdWeek').removeClass('active');
				$(this).addClass('active');
			};
		});
	}
	else{
		$('.thirdWeek').each(function(index, item) {
			if ($(item).text() == currentDate.getDate()) {
				$('.secondWeek').removeClass('active');
				$('.thirdWeek').removeClass('active');
				$('.fourthWeek').removeClass('active');
				$(this).addClass('active');
			};
		});
		$('.fourthWeek').each(function(index, item) {
			if ($(item).text() == currentDate.getDate()) {
				$('.thirdWeek').removeClass('active');
				$('.fourthWeek').removeClass('active');
				$('.fifthWeek').removeClass('active');
				$(this).addClass('active').wrapInner("<div class='round'></div>");
			};
		});
		$('.fifthWeek').each(function(index, item) {
			if ($(item).text() == currentDate.getDate()) {
				$('.fourthWeek').removeClass('active');
				$('.fifthWeek').removeClass('active');
				$('.sixthWeek').removeClass('active');				
				$(this).addClass('active');
			};
		});
		$('.sixthWeek').each(function(index, item) {
			if ($(item).text() == currentDate.getDate()) {
				$('.fifthWeek').removeClass('active');
				$('.sixthWeek').removeClass('active');	
				$(this).addClass('active');
			};
		});
	}
}

// displays table of 16 years with receipted year
function setYear(yy){
	yy = parseInt(yy/16) * 16;
	$('.yy').each(function(index, item){
		$(item).text(yy + index);
		if ((yy + index) == currentYear) {
			$(this).addClass('active');
		};
	})
	$('.years').text(yy + " - " + (yy + 15));
}

// converts number eqivalent of month to string
function monthToString(m){
	switch(m){
		case(0): return "January";
		case(1): return "February";
		case(2): return "March";
		case(3): return "April";
		case(4): return "May";
		case(5): return "June";
		case(6): return "July";
		case(7): return "August";
		case(8): return "September";
		case(9): return "October";
		case(10): return "November";
		case(11): return "December";
	}
}