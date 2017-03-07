// function arrayFilling
// function arrayHorizontalFilling
// function arrayHorizontalFillingRight 
// function arrayVerticalFilling
// function arrayHorizontalRemoving
// function arrayHorizontalRemovingRight 
// function arrayVerticalRemoving
// function availableRow
// function canIStart
// function correctHorizontal
// function correctVertical
// function correctHorizontalTurning
// function correctHorizontalTurningRight
// function correctVerticalTurning
// function correctVerticalTurningRight
// function destroyedShipsEnable
// function draw
// function easyEnemyShot 				IN PROGRESS
// function fullClear
// function fullRandomFilling
// function getElementFromPoint
// function getEnemyArray
// function getHint
// function getHorizontalShip
// function getHorizontalShipRight
// function getVerticalShip
// function getUserArray
// function hint
// function incorrectShipSetting
// function incorrectShipTurning
// function incorrectShipTurningRight 
// function isCell
// function isShipDestroyedHorizontal
// function isShipDestroyedVertical
// function isShipHorizontal
// function missesFillingHorizontal     IN PROGRESS
// function missesFillingVertical     IN PROGRESS
// function newEmptyArray
// function randomArrayFilling
// function getRandomNumber
// function randomTrueFalse
// function scoreStart
// function scoreZero
// function setUserArray
// function shipAmount
// function shipAmountAddBack
// function shipAmountTake
// function shipLength
// function shipLengthRight 
// function shipTurning
// function shipTurningRight 
// function shootingHandler  			IN PROGRESS
// function startingCol
// function startingColRight  
// function startingRow
// function unavailableRow
// function userSetting
// function userShot			IN PROGRESS

function ca(variable) {
	// The user function for userSettinging.
	console.log(variable);
	alert(variable);
}

function c(variable) {
	// The user function for userSettinging.
	console.log(variable);
}

function cc(variable1, variable2) {
	// The user function for userSettinging.
	console.log(variable1 + " " + variable2);
}

function a(variable) {
	// The user function for userSettinging.
	alert(variable);
}

function wa(variable) {
	alert(variable + " has worked!");
}

function wc(variable) {
	console.log(variable + " has worked!");
}

function wca(variable) {
	alert(variable + " has worked!");
	console.log(" has worked!");
}


/* ------------------------ Functions ------------------------ */

function arrayFilling(cell, row) {
	// The function fills an emptyArray. It means that 0 value is an empty table cell and 1 value is a ship (or ship's part).
	
	var array = getUserArray(),
		rowLength = row.length,
		columnIndex = cell.index(),
		rowIndex = cell.parent().index() - 1,
		score = row.parent().next().find(".score");

	if (correctHorizontal(array, rowIndex, columnIndex, rowLength)) { 
		arrayHorizontalFilling(array, rowIndex, columnIndex, rowLength);
		shipAmountTake(score);
		draw();
	} else {
		incorrectShipSetting(row, "#1af");
		hint("placeError");
		setTimeout(function() {
			hint("reset");
		}, 1500);
		$("#userField table").droppable("disable");
	}

	if ( canIStart() ) {
		hint("ready");
	}
	setUserArray(array);
}

function arrayHorizontalFilling(array, row, col, len) {
	// The function fills an array row (ship setting) (Rempica: нужно ли здесь by?) horizontally. 

	var table = $("#userTable .tr");
	for (var i = 0; i < len; i++) {
		array[row][col + i] = 1;
		table.eq(row)
			.children().eq(col + i)
			.addClass("userCell");
	}
}

function arrayHorizontalFillingRight(array, row, col, len) {
	// The function fills an array row (ship setting) (Rempica: нужно ли здесь by?) horizontally. 

	var table = $("#userTable .tr");
	for (var i = 0; i < len; i++) {
		array[row][col - i] = 1;
		table.eq(row)
			.children().eq(col - i)
			.addClass("userCell");
	}
}

function arrayVerticalFilling(array, row, col, len) {
	// The function fills an array row (ship setting) (Rempica: нужно ли здесь by?) vertically.

	var table = $("#userTable .tr");
	for (var i = 0; i < len; i++) {
		array[row + i][col] = 1;
		table.eq(row + i)
			.children().eq(col)
			.addClass("userCell");
	}
}

function arrayHorizontalRemoving(array, row, col, len) {
	// The function removes an array row (ship setting) (Rempica: нужно ли здесь by?) horyzontally.

	var table = $("#userTable .tr");
	for (var i = 1; i < len; i++) {
		array[row][col + i] = 0;
		table.eq(row)
			.children().eq(col + i)
			.removeClass("userCell");
	}
}

function arrayHorizontalRemovingRight(array, row, col, len) {
	// The function removes an array row (ship setting) (Rempica: нужно ли здесь by?) horyzontally.

	var table = $("#userTable .tr");
	for (var i = 1; i < len; i++) {
		array[row][col - i] = 0;
		table.eq(row)
			.children().eq(col - i)
			.removeClass("userCell");
	}
}

function arrayVerticalRemoving(array, row, col, len) {
	// The function removes an array row (ship setting) (Rempica: нужно ли здесь by?) vertically.

	var table = $("#userTable .tr");
	for (var i = 1; i < len; i++) {
		array[row + i][col] = 0;
		table.eq(row + i)
			.children().eq(col)
			.removeClass("userCell");
	}
}

function availableRow() {
	// The function makes "all the rows" (Rempica: "the all rows") available to move.

	$(this).find(".col")
		.css("background-color", "#1af")
		.css("border-right", "1px solid #fff")
		.css("cursor", "pointer")
		.last().css("border-right", "1px solid #000");
}

function canIStart() {
	var result = true;
	$("#enemyDestroyedShips .score").each(function(index) {
		var score = +$(this).text();
		if (score) {
			result = false;
		}
	});

	return result;
}

function correctHorizontal(array, row, col, len) {
	// The function checks can an user set the ship on the battlefield.

	if (col + len > 10 ) {
		return false;
	} else if (col + len < 10) {
		if (array[row][col + len] == 1) {
			return false;
		}
	}
	
	var iStart = (row == 0) ? 0 : row - 1, 	// If a row is the first row (row = 0) then the statemnt doesn't need to check the cell from above.
		jStart = (col == 0) ? 0 : col - 1,	// If a column is the first column (col = 0), the statement doesn't need to check the cell from left. 
		iEnd = (row == 9) ? 2 : 3, 			// The condition checks whether the model adheres to the end of the table.	
		jEnd = (col + len > 9 || col == 0) ? len + 1 : len + 2,
		ilevel = (row == 0) ? 1 : 0;		// If a row is bottom (row = 9), the condition doesn't need to check the row from below.
	
	for (var i = iStart; 	ilevel < iEnd; 		i++, ilevel++) {
		for (var j = jStart, jlevel = 0; 	jlevel < jEnd; 		j++, jlevel++) {
			if (array[i][j] == 1) {
				return false;
			} 
		}
	}

	return true;
}

function correctVertical(array, row, col, len) {
	// The function checks can an user set the ship on the battlefield.

	if (col - len < -1 ) {
		return false;
	} else if (col - len > -1) {
		if (array[row][col - len] == 1) {
			return false;
		}
	}

	var iStart = (row == 0) ? 0 : row - 1,
		jStart = (col == 0) ? 0 : col - 1,			
		iEnd = (row + len > 9 || row == 0) ? len + 1 : len + 2,		
		jEnd = (col == 9) ? 2 : 3, 
		jlevel = (col == 0) ? 1 : 0;

	for (var j = jStart; 	jlevel < jEnd; 		j++, jlevel++) {
		for (var i = iStart, ilevel = 0; 	ilevel < iEnd; 		i++, ilevel++) {
			if (array[i][j] == 1) {
				return false;
			} 
		}
	}

	return true;
}

function correctHorizontalTurning(array, row, col, len) {
	// The function checks can the ship be turned.

	for (var k = 2; k < len; k++) {
		if (array[row][col + k] == 1) {
			return false;
		}
	}
	if (col + len > 10 ) {
		return false;
	} else if (col + len < 10) {
		if (array[row][col + len] == 1) {
			return false;
		}
	}

	var iStart = (row == 0) ? 1 : row - 1,
		jStart = col + 1,		
		iEnd = (row == 9) ? 1 : 2, 			
		jEnd = (col + len < 10) ? len : len - 1,
		ilevel = (row == 0) ? 1 : 0;

	for (var i = iStart; 	ilevel < iEnd; 		i = i + 2, ilevel++) {
		for (var j = jStart, jlevel = 0; 	jlevel < jEnd; 		j++, jlevel++) {
			if (array[i][j] == 1) {
				return false;
			} 
		}
	}

	return true;
}

function correctHorizontalTurningRight(array, row, col, len) {
	// The function checks can the ship be turned.
	
	if (col - len < -1 ) {
		return false;
	} else if (col - len > -1) {
		if (array[row][col - len] == 1) {
			return false;
		}
	}

	var iStart = (row == 0) ? 1 : row - 1,
		jStart = col - 1,		
		iEnd = (row == 9) ? 1 : 2, 			
		jEnd = (col + len < 10) ? len : len - 1,
		ilevel = (row == 0) ? 1 : 0;

	for (var i = iStart; 	ilevel < iEnd; 		i = i + 2, ilevel++) {
		for (var j = jStart, jlevel = 0; 	jlevel < jEnd; 		j--, jlevel++) {
			if (array[i][j] == 1) {
				return false;
			} 
			for (var k = 2; k < len; k++) {
				if (array[row][col - k] == 1) {
					return false;
				}
			}
		}
	}
	return true;
}

function correctVerticalTurning(array, row, col, len) {
	// The function checks can the ship be turned.

	if (row + len > 10 ) {
		return false;
	} else if (row + len < 10) {
		if (array[row + len][col] == 1) {
			return false;
		}
		for (var k = 2; k < len; k++) {
			if (array[row + k][col] == 1) {
				return false;
			}
		}
	}

	var iStart = row + 1,
		jStart = (col == 0) ? 1 : col - 1,		
		jEnd = (col == 9) ? 1 : 2, 			
		iEnd = (row + len < 10) ? len : len - 1,
		jlevel = (col == 0) ? 1 : 0;

	for (var j = jStart; 	jlevel < jEnd; 		j = j + 2, jlevel++) {
		for (var i = iStart, ilevel = 0; 	ilevel < iEnd; 		i++, ilevel++) {
			if (array[i][j] == 1) {
				return false;
			} 
		}
	}

	return true;
}

function correctVerticalTurningRight(array, row, col, len) {
	// The function checks can the ship be turned.

	if (row + len > 10 ) {
		return false;
	} else if (row + len < 10) {
		if (array[row + len][col] == 1) {
			return false;
		}
		for (var k = 2; k < len; k++) {
			if (array[row + k][col] == 1) {
				return false;
			}
		}
	}

	var iStart = row + 1,
		jStart = (col == 0) ? 1 : col - 1,		
		jEnd = 2, 			
		iEnd = (row + len < 10) ? len : len - 1,
		jlevel = (col == 0) ? 1 : 0;

	for (var j = jStart; 	jlevel < jEnd; 		j = j + 2, jlevel++) {
		for (var i = iStart, ilevel = 0; 	ilevel < iEnd; 		i++, ilevel++) {
			if (array[i][j] == 1) {
				return false;
			} 
		}
	}

	return true;
}

function destroyedShipsEnable() {
	// The function draws #enemyDestryoedShips in red color

	$("#enemyDestroyedShips .row").each(function() {
		$(this).find(".col").css("background-color", "#f20")
		.css("border-right", "1px solid #fff")
		.css("cursor", "default")
		.last().css("border-right", "1px solid #000");
	});
}

function draw(color = "#aaddee") {
	// The function draws the ships on the fields.

	$("#userTable .cell").css("background-color", "#fff");
	$("#userTable .userCell").css("background-color", color);
	$("#enemyTable .hit").css("background-color", "red");
	$("#userTable .hit").css("background-color", "red");
}

function easyEnemyShot() {
	var isMissed = true;

	do {
		var row = getRandomNumber(),
			col = getRandomNumber(),
			cell = $("#userTable .tr").eq(row).children().eq(col),
			isHitMiss = cell.hasClass("miss") || cell.hasClass("hit");
	} while (isHitMiss);

	var array = getUserArray();
	if (array[row][col] == 1) {
		result = false;
		cell.removeClass("userCell").addClass("hit"); 
	} else {
		cell.addClass("miss");
	}

	draw("#1af");
	return isMissed;

}

function fullClear() {
	// The function removes "userCell" class from the all td cells of #userTable.

	$("#userTable .userCell")
		.css("background-color", "#fff")
		.removeClass("userCell");
}

function fullRandomFilling() {
	// The function fills an array by ships with random positions and draws it.

	fullClear();
	var userArray = randomArrayFilling(),
		draggableRows = $(".row");

	setUserArray(userArray);
	draw();
}

function getElementFromPoint(left, top) {
	return $(document.elementFromPoint(left, top));
}

function getEnemyArray() {
	return globalEnemyArray;
}

function getHint(key) {
	return hints[key];
}

function getHorizontalShip(row, col, len) {
	// The function defines the ship by horizontally when an user clicks on "userCell".

	var cell = $("#userTable .tr").eq(row).children().eq(col),
		collection = cell;

	for (var i = 1; i < len; i++) {
		cell = cell.next();
		collection = collection.add(cell);
	}

	return collection;
}

function getHorizontalShipRight(row, col, len) {
	// The function defines the ship by horizontally when an user clicks on "userCell".

	var cell = $("#userTable .tr").eq(row).children().eq(col),
		collection = cell;

	for (var i = 1; i < len; i++) {
		cell = cell.prev();
		collection = collection.add(cell);
	}

	return collection;
}

function getVerticalShip(row, col, len) {
	// The function defines the ship by vertically when an user clicks on "userCell".

	var cell = $("#userTable .tr").eq(row).children().eq(col),
		collection = cell;

	for (var i = 1; i < len; i++) {
		cell = cell.parent().next().children().eq(col);
		collection = collection.add(cell);
	}

	return collection;
}

function getUserArray() {
	return globalUserArray;
}

function hint(key) {
	var tip = getHint(key);
	$("#hints").find("p")
		.stop(true)
		.fadeOut("fast", function() {
			$(this).text(tip);
		})
		.fadeIn("fast");
}

function incorrectShipSetting(row, color = "#aaddee") {
	setTimeout(function() {
		row.css("background-color", "red");
	}, 0);	
	setTimeout(function() {
		row.css("background-color", color);
	}, 125);
		setTimeout(function() {
		row.css("background-color", "red");
	}, 250);
	setTimeout(function() {
		row.css("background-color", color);
	}, 375);
		
}

function incorrectShipTurning(array, row, col, len, isHorizontal) { 
	// The function notifies if the ship can't be turned.

	hint("rotateError");
	setTimeout(function() {
		hint("ready");
	}, 3500);
	if (isHorizontal) {
		var model = getHorizontalShip(row, col, len);
		incorrectShipSetting(model);
	} else {
		var model = getVerticalShip(row, col, len);
		incorrectShipSetting(model);
	}
}

function incorrectShipTurningRight(array, row, col, len, isHorizontal) { 
	// The function notifies if the ship can't be turned.

	hint("rotateError");
	setTimeout(function() {
		hint("ready");
	}, 3500);
	if (isHorizontal) {
		var model = getHorizontalShipRight(row, col, len);
		incorrectShipSetting(model);
	} else {
		var model = getVerticalShip(row, col, len);
		incorrectShipSetting(model);
	}
}

function isCell(cell) {
	// The function defines if the moving row was put on an user cell.

	var row0 = $("#userField .row0"),
		caption = $("#userCaption");

	if (cell.parent().is(row0) || cell.is(caption)) {
		return false;
	}

	return true;
}

function isShipDestroyedHorizontal(row, col, len) {
	var cell = $("#enemyTable .tr").eq(row).children().eq(col);
	for (var i = 0; i < len; i++) {
		if ( !(cell.hasClass("hit")) ) {
			return false;
		}
		cell = cell.next();
	}

	return true;
}

function isShipDestroyedVertical(row, col, len) {
	var cell = $("#enemyTable .tr").eq(row).children().eq(col);
	for (var i = 0; i < len; i++) {
		if ( !(cell.hasClass("hit")) ) {
			return false;
		}
		cell = cell.parent().next().children().eq(col);
	}

	return true;
}	

function isShipHorizontal(array, row, col) {
	// The function defines if the ship is placed horizontally (true if he is).

	if (col != 0 && col != 9) { 
		if (array[row][col + 1]) {
			return true;
		}
		if (array[row][col - 1]) {
			return true;
		}
	} else if (col == 0) {
		if (array[row][col + 1]) {
			return true;
		}
		else 
			return false;
	} else {
		if (array[row][col - 1]) {
			return true;
		}
		else 
			return false;
	}

	return false;
}

function missesFillingHorizontal(row, col, len) {
	// The function checks can the ship be turned.

	var table = $("#enemyTable .tr"),
		iStart = (row == 0) ? 1 : row - 1, 	
		jStart = (col == 0) ? 0 : col - 1,	
		iEnd = (row == 9) ? 1 : 2, 			
		jEnd = (col + len > 9 || col == 0) ? len + 1 : len + 2,
		ilevel = (row == 0) ? 1 : 0;

	if (col) {
		table.eq(row).children().eq(jStart).addClass("miss");		
	}
	if (col + len < 10) {
		table.eq(row).children().eq(col + len).addClass("miss");		
	}

	for (var i = iStart; 	ilevel < iEnd; 		i = i + 2, ilevel++) {
		for (var j = jStart, jlevel = 0; 	jlevel < jEnd; 		j++, jlevel++) {
			table.eq(i).children().eq(j).addClass("miss");
		}
	}

}

function missesFillingVertical(row, col, len) {
	// The function checks can the ship be turned.

	var table = $("#enemyTable .tr"),
		iStart = (row == 0) ? 0 : row - 1,
		jStart = (col == 0) ? 1 : col - 1,			
		iEnd = (row + len > 9 || row == 0) ? len + 1 : len + 2,		
		jEnd = (col == 9) ? 1 : 2, 
		jlevel = (col == 0) ? 1 : 0;

	if (row) {
		table.eq(iStart).children().eq(col).addClass("miss");		
	}
	if (row + len < 10) {
		table.eq(row + len).children().eq(col).addClass("miss");		
	}

	for (var j = jStart; 	jlevel < jEnd; 		j = j + 2, jlevel++) {
		for (var i = iStart, ilevel = 0; 	ilevel < iEnd; 		i++, ilevel++) {
			table.eq(i).children().eq(j).addClass("miss");
		}
	}

}

function newEmptyArray() {
	// The function creates a new empty array (every cell equal 0).

	var emptyArray = [];
	for(var i = 0; i < 10; i++) {
		emptyArray[i] = [];
		for (var j = 0; j < 10; j++) {
			emptyArray[i][j] = 0;
		}
	}

	return emptyArray;
}

function randomArrayFilling() {
	// The function fills an array by random positions and returns it.

	var shipCounter = 1,
		shipLength = 4,
		isHorizontal = randomTrueFalse(),
		array = newEmptyArray();

	for (var i = 0; i < 4; i++) {
		for (var j = 0, count = shipCounter; j < shipCounter; j++) {
			var isHorizontal = randomTrueFalse();
			if (isHorizontal) {
				var rowIndex = getRandomNumber(), columnIndex = getRandomNumber(7);
				if (correctHorizontal(array, rowIndex, columnIndex, shipLength)) {
					arrayHorizontalFilling(array, rowIndex, columnIndex, shipLength);
				} else --j;
			} else {
				var rowIndex = getRandomNumber(7), columnIndex = getRandomNumber();

				if (correctVertical(array, rowIndex, columnIndex, shipLength)) {
					arrayVerticalFilling(array, rowIndex, columnIndex, shipLength);
				} else --j;
			}
		}
		shipCounter++;
		shipLength--;
	}

	return array;
}

function getRandomNumber(max = 10) {
	// The function returns a random number between 0 and "max" ("max" equals 10, if it is not defined).
	return Math.floor(Math.random() * max);
}

function randomTrueFalse() {
	// The function returns a random "true" or "false" value.
	return Math.random() < 0.5 ? true : false;
}

function scoreStart() {
	// The function sets amount of the ships.
	$(".score").each(function(index) {
		$(this)
			.text(index + 1);
	});
}

function scoreZero() {
	$(".score").text("0");
}

function setUserArray(newArray) {
	globalUserArray = newArray;
}

function shipAmount(value) {
	// The function gets the ship's amount and returns it.
	return +value.text();
}

function shipAmountAddBack(value) {
	// The function returns the amount of the available ships if it wasn't set or if it was set on wrong place.
	var shipsAmount = shipAmount(value);
	value.text(++shipsAmount);
}

function shipAmountTake(value) {
	// The function takes the amount of the available ships.
	var shipsAmount = shipAmount(value);
	value.text(shipsAmount - 1);
}

function shipLength(array, row, col, isHorizontal) {
	// The function returns the ship length.

	var rowLength = 1;

	if (isHorizontal) {
		while (col != 9 && array[row][col + 1]) {
			rowLength++;
			col++;
		}
	} else {
		while (row != 9 && array[row + 1][col]) {
			rowLength++;
			row++;
		}
	}

	return rowLength;
}

function shipLengthRight(row, col, isHorizontal) {
	// The function returns the ship length.

	var array = getUserArray(),
		rowLength = 1;

	if (isHorizontal) {
		while (col != 0 && array[row][col - 1]) {
			rowLength++;
			col--;
		}
	} else {
		while (row != 9 && array[row + 1][col]) {
			rowLength++;
			row++;
		}
	}

	return rowLength;
}

function shipTurning() {
	// The function turns the ship if it is possible and draws the new ship's position.

	var helper = $(this),
		columnIndex = helper.index(),
		rowIndex = helper.parent().index() - 1,
		array = getUserArray();
		isHorizontal = isShipHorizontal(array, rowIndex, columnIndex);

	rowIndex = startingRow(array, rowIndex, columnIndex, isHorizontal);
	columnIndex = startingCol(array, rowIndex, columnIndex, isHorizontal);

	var rowLength = shipLength(array, rowIndex, columnIndex, isHorizontal);

	if (rowLength > 1) {
		if (isHorizontal) {
			if (correctVerticalTurning(array, rowIndex, columnIndex, rowLength)) {
				arrayHorizontalRemoving(array, rowIndex, columnIndex, rowLength),
				arrayVerticalFilling(array, rowIndex, columnIndex, rowLength);
			} else {
				incorrectShipTurning(array, rowIndex, columnIndex, rowLength, isHorizontal);
			}
		} else {
			if (correctHorizontalTurning(array, rowIndex, columnIndex, rowLength)) {
				arrayVerticalRemoving(array, rowIndex, columnIndex, rowLength);
				arrayHorizontalFilling(array, rowIndex, columnIndex, rowLength);
			} else {
				incorrectShipTurning(array, rowIndex, columnIndex, rowLength, isHorizontal);
			}
		}
	}

	draw();
	setUserArray(array);
	setTimeout(draw, 500);
}

function shipTurningRight() { 
	// The function turns the ship if it is possible and draws the new ship's position.
	
	var helper = $(this),
		columnIndex = helper.index(),
		rowIndex = helper.parent().index() - 1,
		array = getUserArray(),
		isHorizontal = isShipHorizontal(array, rowIndex, columnIndex);

	rowIndex = startingRow(rowIndex, columnIndex, isHorizontal);
	columnIndex = startingColRight(rowIndex, columnIndex, isHorizontal);
	var rowLength = shipLengthRight(rowIndex, columnIndex, isHorizontal);

	if (rowLength > 1) {
		if (isHorizontal) {
			if (correctVerticalTurningRight(array, rowIndex, columnIndex, rowLength)) {
				arrayHorizontalRemovingRight(array, rowIndex, columnIndex, rowLength),
				arrayVerticalFilling(array, rowIndex, columnIndex, rowLength);
			} else {
				incorrectShipTurningRight(array, rowIndex, columnIndex, rowLength, isHorizontal);
			}
		} else {
			if (correctHorizontalTurningRight(array, rowIndex, columnIndex, rowLength)) {
				arrayVerticalRemoving(array, rowIndex, columnIndex, rowLength);
				arrayHorizontalFillingRight(array, rowIndex, columnIndex, rowLength);
			} else {
				incorrectShipTurningRight(array, rowIndex, columnIndex, rowLength, isHorizontal);
			}
		}
	}

	draw();
	setUserArray(array);
	setTimeout(draw, 500);
}

function shootingHandler() {
	var target = $(this),
		field = $("#enemyField"),
		isHitMiss = target.hasClass("miss") || target.hasClass("hit");

		if (!isHitMiss) {
			var shot = userShot(target);
		} else {
			return;
		}

		if (shot) {
			field.off("click", ".enemyCell", shootingHandler);
			var timerId = setInterval(function() {
				var isEnemyMissed = easyEnemyShot();
				if (isEnemyMissed) {
					clearInterval(timerId);
					hint("userShot");
					field.on("click", ".enemyCell", shootingHandler);
				} else {
					hint("enemyHit");
				}
			}, 1);
		}
}

function startingCol(array, row, col, isHorizontal) {
	// The function returns the first postion of the column.

	if (isHorizontal && col != 0) {
		for (var i = 0; i < 4; i++) {
			if (col == 0) {
				return col;
			} else if (array[row][col - 1] != 0) {
				col--;
			} else {
				return col;
			}
		}
	}

	return col;
}

function startingColRight(row, col, isHorizontal) {
	// The function returns the first postion of the column.

	var array = getUserArray();
	if (isHorizontal && col != 9) {
		for (var i = 0; i < 4; i++) {
			if (col == 9) {
				return col;
			} else if (array[row][col + 1] != 0) {
				col++;
			} else {
				return col;
			}
		}
	}

	return col;
}

function startingRow(array, row, col, isHorizontal) {
	// The function returns the first position of the row.

	if (!isHorizontal && row != 0) {
		for (var i = 0; i < 5; i++) {
			if (row == 0) {
				return row;
			} else if (array[row - 1][col] != 0) {
				row--;
			} else {
				return row;
			}
		}
	}
	
	return row;
}

function unavailableRow(row) {
	// The function makes the row unavailable to move.
	row.each(function() {
		$(this).find(".col").css("background-color", "#fff")
		.css("border-right", "1px solid #d1d1d1")
		.css("cursor", "default")
		.last().css("border-right", "1px solid #000");
	});
}

function userSetting(cell, row, array) {
	// The function fills the user field by the ship.
	if (!isCell(cell)) {

		return;
	} 

	var rowLength = row.length;

	arrayFilling(cell, row);
}

function userShot(cell) {
	var array = getEnemyArray(),
		columnIndex = cell.index(),
		rowIndex = cell.parent().index() - 1;

	if (array[rowIndex][columnIndex]) {
		cell.addClass("hit");
	var isHorizontal = isShipHorizontal(array, rowIndex, columnIndex),
		rowIndex = startingRow(array, rowIndex, columnIndex, isHorizontal),
		columnIndex = startingCol(array, rowIndex, columnIndex, isHorizontal),
		rowLength = shipLength(array, rowIndex, columnIndex, isHorizontal);

		if (isHorizontal) {
			if (isShipDestroyedHorizontal(rowIndex, columnIndex, rowLength)) {
				missesFillingHorizontal(rowIndex, columnIndex, rowLength);
				hint("destroyed");
			} 
		} else {
			if (isShipDestroyedVertical(rowIndex, columnIndex, rowLength)) {
				missesFillingVertical(rowIndex, columnIndex, rowLength);
				hint("destroyed");
			}
		}
		hint("userHit");

	} else {
		hint("enemyShot");
		cell.addClass("miss");
		return true;
	}

	return false;
}


/* ------------------------ Functions ------------------------ */

// The globas user and enemy arrays
var globalUserArray = newEmptyArray();
var globalEnemyArray = randomArrayFilling();
var hints = {
	"ready": 'Press "Start" button to continue.',
	"reset": "Move the ship on the user field.",
	"placeError": "Select another place.",
	"rotateError": "The ship can't be rotated.",
	"gameStarted": "The game is started. Shoot!",
	"enemyShot": "You missed. Your opponent is shooting...",
	"userHit": "You hit! Take the shot again.",
	"enemyHit": "He hit. Your opponent is shooting again...",
	"userShot": "He missed. Your turn to shooting.",
	"destroyed": "You destroyed the ship. Take your shot."
};


$(document).ready(function() {

	$('#beforeGameButton').click(function() {
		var startForm = $('#startForm'),
			game = $('#game'),
			username = $("#username").val(),
			userCaption = $('#userCaption');

		// if (username) {
			fullRandomFilling();
			startForm.hide("fast");
			game.show("fast");	
			hint("ready");
		// 	$(userCaption).text(username);
		// } else {
		// 	$("#username").focus();
		// }


	});	



	$("#randomise").on ("click", function() {
		var draggableRows = $(".row");

		unavailableRow(draggableRows);
		draggableRows.draggable("destroy");
		fullRandomFilling();
		scoreZero();
		hint("ready");
	});



	$("#reset").on("click", function() {
		var userShipsArray = newEmptyArray(),
			droppableUser = $("#userField table"),
			draggableRows = $("#enemyDestroyedShips .row");

		fullClear();
		draggableRows.each(availableRow);
		hint("reset");
		scoreStart();
		setUserArray(userShipsArray);



		$("#enemyDestroyedShips .row").draggable({
			start: function(event, ui) {
				droppableUser.droppable("enable");
				$(this).draggable("option", "disabled", false);
			},
	   		revert: true,
	   		cursor: "move",
	   		handle: ".col",
	   		helper: "original",
	   		snap: "#userField .cell",
	   		snapMode: "inner",
	   		scroll: false,
	   		zIndex: 2
	  	});


	  	droppableUser.droppable({
	  		over: function(event, ui) {
	  			ui.draggable.find(".col").css("background-color", "#28e028");  	  			
	  		},
	  		out: function(event, ui) {
	  			var uiD = ui.draggable,
	  				target = uiD.next().find(".score");

	  			uiD.find(".col").css("background-color", "#1af");
	  		},
	  		tolerance: "fit",
	  		drop: function(event, ui) {
	  			var uiD = ui.draggable,
	  				draggableRow = uiD.find(".col"),
	  				score = uiD.next().find(".score"),
  					offsetLeft = ui.offset.left,
  					offsetTop = ui.offset.top;

	  			setTimeout(function() {
	  				var userCell = getElementFromPoint(offsetLeft, offsetTop);

		  			setTimeout(function() {
			  			if (shipAmount(score) == 0) {
			  				unavailableRow(uiD);
							uiD.draggable("option", "disabled", true);
						} else {
			  				draggableRow.css("background-color", "#1af");
			  			}
	  			}, 1);

	  				userSetting(userCell, draggableRow, userShipsArray);
	  			}, 75);
	  			
	  		}
	  	});
		
	});

	$("#userField").on("click", ".userCell", shipTurning);

	$("#userField").on("contextmenu", ".userCell", shipTurningRight);

	$("#userField").contextmenu(function() {
		return false;
	});

	$("#game .botLevel").on("click", "li", function() {
		$(this)
			.parent()
			.find("span")
			.removeClass("active");
		$(this).find("span").addClass("active");
	});

	$("#start").on("click", function() {
		$("#reset").off("click");
		$("#randomise").off("click");
		$("#userField")
			.off("contextmenu", ".userCell", shipTurningRight)
			.off("click", ".userCell", shipTurning);
		$("#enemyTable").addClass("hoverActive");
		$(this).off("click").fadeOut("slow", function() {
			$("#enemyDestroyedShips").css("marginTop", "150px");
		});
		$("#userTable .userCell").css("background-color", "#1af");

		hint("gameStarted");
		destroyedShipsEnable();

		$("#enemyField").on("click", ".enemyCell", shootingHandler);
	});

});