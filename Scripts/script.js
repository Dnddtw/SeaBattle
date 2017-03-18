// function arrayFilling
// function arrayHorizontalFilling
// function arrayHorizontalFillingRight 
// function arrayVerticalFilling
// function arrayHorizontalRemoving
// function arrayHorizontalRemovingRight 
// function arrayVerticalRemoving
// function availableRow
// function canIStart
// function canIFinishEnemy
// function canIFinishUser
// function correctHorizontal
// function correctVertical
// function correctHorizontalTurning
// function correctHorizontalTurningRight
// function correctVerticalTurning
// function correctVerticalTurningRight
// function destroyedShipsEnable
// function didyouknow
// function draw
// function enemyEasyMediumShot 
// function enemyHardShot
// function finishGame
// function fullClear
// function fullRandomFilling
// function getElementFromPoint
// function getEnemyArray
// function getHint
// function getHintKey
// function getHorizontalShip
// function getHorizontalShipRight
// function getKnowIndex
// function getLanguage
// function getVerticalShip
// function getUserArray
// function hardBot					
// function hint
// function incorrectShipSetting
// function incorrectShipTurning
// function incorrectShipTurningRight 
// function isCell
// function isHitMiss				
// function isShipDestroyedHorizontal
// function isShipDestroyedVertical
// function isShipHorizontal
// function languages
// function mediumBot
// function missesFillingHorizontal
// function missesFillingVertical
// function newEmptyArray
// function nextShot 		
// function randomArrayFilling
// function getRandomNumber
// function randomTrueFalse
// function scoreStart
// function scoreZero
// function setUserArray
// function shipAmount
// function shipAmountAdd
// function shipAmountTake
// function shipLength
// function shipLengthRight 
// function shipTurning
// function shipTurningRight 
// function easyBot
// function startingCol
// function startingColRight  
// function startingRow
// function unavailableRow
// function userSetting
// function userShot
// function windowSize

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

	$(this).draggable("option", "disabled", false);
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

function canIFinishEnemy() {
	var result = true;

	$("#enemyDestroyedShips .score").each(function() {
		var score = $(this);
		if (shipAmount(score)) {
			result = false;
		} 
	});

	return result
}

function canIFinishUser() {
	for (var i = 0; i < userShips.length; i++) {
		if (userShips[i] != 0) {
			return false;
		}
	}

	return true;
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
		$(this).find(".col").css("background-color", "rgba(255, 0, 0, 0.65)")
		.css("border-right", "1px solid #fff")
		.css("cursor", "default")
		.last().css("border-right", "1px solid #000");
	});
}

function didyouknow(str) {
	if (str !== undefined) {
		return 
	}

	var len = know.length,
		index = getRandomNumber(len);
	
	for (var i = 0; i < 4; i++) {
		if (index == used[i]) {
			index = getRandomNumber(len);
			i = 0;
		}
	}
	used.shift();
	used.push(index);

	$("#didyouknow p")
		.fadeOut("slow", function() {
			$(this).text(know[index]);
		})
		.fadeIn("slow");
}

function draw(color = "#aaddee") {
	// The function draws the ships on the fields.

	$("#userTable .cell").css("background-color", "#fff");
	$("#userTable .userCell").css("background-color", color);
	$("#enemyTable .hit").css("background-color", "red");
	$("#userTable .hit").css("background-color", "red");
}

function enemyEasyMediumShot(row, column) {
	var result = true, 
		array = getUserArray(),
		table = $("#userTable .tr"),
		checked = false;

	if (!isDestroyed ) {
		for (var i = 1; row != 0 && row - i >= 0; i++) {
			cell = table.eq(row - i).children().eq(column);
			if (cell.hasClass("miss")) {
				break;
			} else if (cell.hasClass("hit")) {
				continue;
			} else {
				checked = true;
				var rowIndex = row - i,
					columnIndex = column;
				break;
			}
		}
	
		if (!checked) {
			for (var i = 1; row != 9 && row + i <= 9; i++) {
				cell = table.eq(row + i).children().eq(column);
				if (cell.hasClass("miss")) {
					break;
				} else if (cell.hasClass("hit")) {
					continue;
				} else {
					checked = true;
					var rowIndex = row + i,
						columnIndex = column;
					break;
				}
			}
		}

		if (!checked) {
			for (var i = 1; column && column - i >= 0; i++) {
				cell = table.eq(row).children().eq(column - i);
				if (cell.hasClass("miss")) {
					break;
				} else if (cell.hasClass("hit")) {
					continue;
				} else {
					checked = true;
					var rowIndex = row,
						columnIndex = column - i;
					break;
				}
			}
		}

		if (!checked) {
			for (var i = 1; column != 9 && column + i <= 9; i++) {
				cell = table.eq(row).children().eq(column+ i);
				if (cell.hasClass("miss")) {
					break;
				} else if (cell.hasClass("hit")) {
					continue;
				} else {
					checked = true;
					var rowIndex = row,
						columnIndex = column + i;
					break;
				}
			}
		}
	} else {
		do {
			var rowIndex = getRandomNumber(),
				columnIndex = getRandomNumber(),
				cell = table.eq(rowIndex).children().eq(columnIndex),
				isMissHit = isHitMiss(cell),
				hit = true;
			} while (isMissHit);
	}

	if (hit && array[rowIndex][columnIndex]) {
		Grow = rowIndex;
		Gcolumn = columnIndex;
		isDestroyed = false;
	}


	if (array[rowIndex][columnIndex]) {
		result = false;
		cell.removeClass("userCell").addClass("hit"); 

		var isHorizontal = isShipHorizontal(array, rowIndex, columnIndex),
			rowIndex = startingRow(array, rowIndex, columnIndex, isHorizontal),
			columnIndex = startingCol(array, rowIndex, columnIndex, isHorizontal),
			rowLength = shipLength(array, rowIndex, columnIndex, isHorizontal);

		if (isHorizontal) {
			if (isShipDestroyedHorizontal(table, rowIndex, columnIndex, rowLength)) {
				missesFillingHorizontal(table, rowIndex, columnIndex, rowLength);
				hint("enemyDestroyed");
				userShips[rowLength - 1]--;
				isDestroyed = true;
				Grow = false;
				c(userShips);
				if (isUnmuted) {	new Audio("Audio/audioDestroyed.mp3").play();	}
			} else {
				isDestroyed = false;
			}
		} else {
			if (isShipDestroyedVertical(table, rowIndex, columnIndex, rowLength)) {
				missesFillingVertical(table, rowIndex, columnIndex, rowLength);
				hint("enemyDestroyed");
				userShips[rowLength - 1]--;
				isDestroyed = true;
				Grow = false;
				c(userShips);
				if (isUnmuted) {	new Audio("Audio/audioDestroyed.mp3").play();	}
			}else {
				isDestroyed = false;
			}
		}
	} else {
		cell.addClass("miss");
	}

	draw("#1af");
	return result;
}

function enemyHardShot(row, column, hor) {
	var result = true, 
		array = getUserArray(),
		table = $("#userTable .tr"),
		checked = false;

	if (!isDestroyed ) {
		if (!hor) {
			for (var i = 1; row != 0 && row - i >= 0; i++) {
				cell = table.eq(row - i).children().eq(column);
				if (cell.hasClass("miss")) {
					break;
				} else if (cell.hasClass("hit")) {
					continue;
				} else {
					checked = true;
					var rowIndex = row - i,
						columnIndex = column;
					break;
				}
			}
		}
	

		if (!checked && !hor) {
			for (var i = 1; row != 9 && row + i <= 9; i++) {
				cell = table.eq(row + i).children().eq(column);
				if (cell.hasClass("miss")) {
					break;
				} else if (cell.hasClass("hit")) {
					continue;
				} else {
					checked = true;
					var rowIndex = row + i,
						columnIndex = column;
					break;
				}
			}
		}

		if (!checked && hor) {
			for (var i = 1; column != 0 && column - i >= 0; i++) {
				cell = table.eq(row).children().eq(column - i);
				if (cell.hasClass("miss")) {
					break;
				} else if (cell.hasClass("hit")) {
					continue;
				} else {
					checked = true;
					var rowIndex = row,
						columnIndex = column - i;
					break;
				}
			}
		}

		if (!checked && hor) {
			for (var i = 1; column != 9 && column + i <= 9; i++) {
				cell = table.eq(row).children().eq(column + i);
				if (cell.hasClass("miss")) {
					break;
				} else if (cell.hasClass("hit")) {
					continue;
				} else {
					checked = true;
					var rowIndex = row,
						columnIndex = column + i;
					break;
				}
			}
		}
	} else {
		do {
			var rowIndex = getRandomNumber(),
				columnIndex = getRandomNumber(),
				cell = table.eq(rowIndex).children().eq(columnIndex),
				isMissHit = isHitMiss(cell),
				hit = true;
			} while (isMissHit);
	}

	if (hit && array[rowIndex][columnIndex]) {
		Grow = rowIndex;
		Gcolumn = columnIndex;
		isDestroyed = false;
		horizontal = isShipHorizontal(array, rowIndex, columnIndex);
	}

	if (array[rowIndex][columnIndex]) {
		result = false;
		cell.removeClass("userCell").addClass("hit");

		var isHorizontal = isShipHorizontal(array, rowIndex, columnIndex),
			rowIndex = startingRow(array, rowIndex, columnIndex, isHorizontal),
			columnIndex = startingCol(array, rowIndex, columnIndex, isHorizontal),
			rowLength = shipLength(array, rowIndex, columnIndex, isHorizontal);

		if (isHorizontal) {
			if (isShipDestroyedHorizontal(table, rowIndex, columnIndex, rowLength)) {
				missesFillingHorizontal(table, rowIndex, columnIndex, rowLength);
				hint("enemyDestroyed");
				userShips[rowLength - 1]--;
				isDestroyed = true;
				Grow = false;
				if (isUnmuted) {	new Audio("Audio/audioDestroyed.mp3").play();	}
			} else {
				isDestroyed = false;
			}
		} else {
			if (isShipDestroyedVertical(table, rowIndex, columnIndex, rowLength)) {
				missesFillingVertical(table, rowIndex, columnIndex, rowLength);
				hint("enemyDestroyed");
				userShips[rowLength - 1]--;
				isDestroyed = true;
				Grow = false;
				if (isUnmuted) {	new Audio("Audio/audioDestroyed.mp3").play();	}
			}else {
				isDestroyed = false;
			}
		}
	} else {
		cell.addClass("miss");
	}

	draw("#1af");
	return result;
}

function finishGame() {

}

function totalClear() {
	$(".cell")
		.removeClass("miss hit")
		.css("background-color", "#fff");
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

function getHintKey() {
	var message = $("#hints p").text();
	for (var key in hints) {
		if (hints[key] == message) {
			return key;
		} 
	}
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

function getKnowIndex() {
	var message = $("#didyouknow p").text();
	for (var i = 0; i < know.length; i++) {
		if (know[i] == message) {
			return i;
		} 
	}
}

function getLanguage() {
	return whatLanguage;
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

function hardBot() {
	var target = $(this),
		field = $("#enemyField"),
		isHitMiss = target.hasClass("miss") || target.hasClass("hit");

	if (!isHitMiss) {
		var shot = userShot(target);
	} else {
		return;
	}

	if (canIFinishEnemy()) {
		field.off("click", ".enemyCell", hardBot);
		var shot = false;
		setTimeout(function() {
			var confirmed = confirm(title["gamewin"]);
			if (confirmed) {
				$("#newgame").trigger("click");
			}
		}, 500);
	}

	if (shot) {
		field.off("click", ".enemyCell", hardBot);
		var timerId = setInterval(function() {
			var isEnemyMissed = enemyHardShot(Grow, Gcolumn, horizontal);
			if (isEnemyMissed) {
				clearInterval(timerId);
				if (isUnmuted) {	new Audio("Audio/audioMiss.mp3").play();	}
				hint("userShot");
				field.on("click", ".enemyCell", hardBot);
			} else {
				if (isUnmuted) {	new Audio("Audio/audioHit.mp3").play();	}
				hint("enemyHit");
				if (canIFinishUser()) {
					clearInterval(timerId);
					setTimeout(function() {
						var confirmed = confirm(title["gamelose"]);
						if (confirmed) {
							$("#newgame").trigger("click");
						}
					}, 500);
					return;
				}
			}
		}, 1750);
	}
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

function isHitMiss(cell) {
	return cell.hasClass("miss") || cell.hasClass("hit");
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

function isShipDestroyedHorizontal(table, row, col, len) {
	var cell = table.eq(row).children().eq(col);
	for (var i = 0; i < len; i++) {
		if ( !(cell.hasClass("hit")) ) {
			return false;
		}
		cell = cell.next();
	}

	return true;
}

function isShipDestroyedVertical(table, row, col, len) {
	var cell = table.eq(row).children().eq(col);
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

function languages(language) {
	var index = getKnowIndex(),
		key = getHintKey(),
		lan = $("#language"),
		head = $("#heading"),
		logo = $("#logo"),
		userLi = $(".userInterface li"),
		botLi = $(".botLevel li");

	switch (language) {
		case "english":
			know = knowEnglish;
			whatLanguage = "english";
			title = titlesEnglish;
			hints = hintsEnglish;
			$("#hints p").text(hints[key]);
			$("#didyouknow p").text(knowEnglish[index]);
			lan.parent().css("padding-left", "0px");
			logo.parent().css("margin-left", "-74px");
			head.css("top", "-50px");
			if (window.matchMedia("(max-width: 970px)").matches || window.matchMedia("(max-height: 767px)").matches) {
				userLi.css("margin-left", "25px");
				botLi.css("margin-right", "25px")
					.last().css("margin-right", "20px");
			} else {
				userLi.css("margin-left", "45px");
				botLi
					.css("margin-right", "45px")
					.last().css("margin-right", "30px");
			}
			break;

		case "ukrainian": 			
			know = knowUkrainian;
			whatLanguage = "ukrainian";
			title = titlesUkrainian;
			hints = hintsUkrainian;
			$("#hints p").text(hints[key]);
			$("#didyouknow p").text(knowUkrainian[index]);
			lan.parent().css("padding-left", "22px");
			logo.parent().css("margin-left", "-100px");
			head.css("top", "-65px");
			if (window.matchMedia("(max-width: 970px)").matches || window.matchMedia("(max-height: 767px)").matches) {
				userLi.css("margin-left", "20px");
				botLi
					.css("margin-right", "10px")
					.last().css("margin-right", "7px");
			} else {
				userLi.css("margin-left", "40px");
				botLi.css("margin-right", "20px");
			}
			break;

		case "russian":
			know = knowRussian;
			whatLanguage = "russian";
			title = titlesRussian;
			hints = hintsRussian;
			$("#hints p").text(hints[key]);
			$("#didyouknow p").text(knowRussian[index]);
			lan.parent().css("padding-left", "20px");
			logo.parent().css("margin-left", "-100px");
			head.css("top", "-65px");
			if (window.matchMedia("(max-width: 969px)").matches || window.matchMedia("(max-height: 767px)").matches) {
				userLi.css("margin-left", "20px");
				botLi.css("margin-right", "10px");
			} else {
				userLi.css("margin-left", "40px");
				botLi.css("margin-right", "22px");
			}
			break;
	}
	
	$("#header .span").removeClass("active");
	$(this).addClass("active");		
	$("#didyouknow h3").text(title["didyouknow"]);
	$("#reset").text(title["reset"]);
	$("#randomise").text(title["randomise"]);
	$("#easy").text(title["easy"]);
	$("#heading").text(title["shipsleft"]);
	$("#medium").text(title["medium"]);
	$("#hard").text(title["hard"]);
	$("#start").attr("value", title["start"]);
	$("#newgame").attr("value", title["newgame"]);
	$("#beforeGameButton").attr("value", title["continue"]);
	$("#username").attr("placeholder", title["username"]);
	$("#enemyTable caption").text(title["opponent"]);
	logo.text(title["seabattle"]);
	lan.text(title["language"]);

}

function mediumBot() {
	var target = $(this),
		field = $("#enemyField"),
		isHitMiss = target.hasClass("miss") || target.hasClass("hit");

	if (!isHitMiss) {
		var shot = userShot(target);
	} else {
		return;
	}

	if (canIFinishEnemy()) {
		field.off("click", ".enemyCell", mediumBot);
		var shot = false;
		setTimeout(function() {
			var confirmed = confirm(title["gamewin"]);
			if (confirmed) {
				$("#newgame").trigger("click");
			}
		}, 500);
	}

	if (shot) {
		field.off("click", ".enemyCell", mediumBot);
		var timerId = setInterval(function() {
			var isEnemyMissed = enemyEasyMediumShot(Grow, Gcolumn);
			if (isEnemyMissed) {
				clearInterval(timerId);
				if (isUnmuted) {	new Audio("Audio/audioMiss.mp3").play();	}
				hint("userShot");
				field.on("click", ".enemyCell", mediumBot);
			} else {
				if (isUnmuted) {	new Audio("Audio/audioHit.mp3").play();	}
				hint("enemyHit");
				if (canIFinishUser()) {
					clearInterval(timerId);
					setTimeout(function() {
						var confirmed = confirm(title["gamelose"]);
						if (confirmed) {
							$("#newgame").trigger("click");
						}
					}, 500);
					return;
				}
			}
		}, 1750);
	}
}

function missesFillingHorizontal(table, row, col, len) {
	// The function checks can the ship be turned.

	var iStart = (row == 0) ? 1 : row - 1, 	
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

function missesFillingVertical(table, row, col, len) {
	// The function checks can the ship be turned.

	var iStart = (row == 0) ? 0 : row - 1,
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

function nextShot() {

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

function shipAmountAdd(value) {
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

	rowIndex = startingRow(array, rowIndex, columnIndex, isHorizontal);
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
	return false;
}

function easyBot() {
	var target = $(this),
		field = $("#enemyField"),
		isHitMiss = target.hasClass("miss") || target.hasClass("hit");

	if (!isHitMiss) {
		var shot = userShot(target);
	} else {
		return;
	}

	if (canIFinishEnemy()) {
		field.off("click", ".enemyCell", easyBot);
		var shot = false;
		setTimeout(function() {
			var confirmed = confirm(title["gamewin"]);
			if (confirmed) {
				$("#newgame").trigger("click");
			}
		}, 500);
	}

	if (shot) {
		field.off("click", ".enemyCell", easyBot);
		var timerId = setInterval(function() {
			var isEnemyMissed = enemyEasyMediumShot();
			if (isEnemyMissed) {
				clearInterval(timerId);
				if (isUnmuted) {	new Audio("Audio/audioMiss.mp3").play();	}
				hint("userShot");
				field.on("click", ".enemyCell", easyBot);
			} else {
				if (isUnmuted) {	new Audio("Audio/audioHit.mp3").play();	}
				hint("enemyHit");
				if (canIFinishUser()) {
					clearInterval(timerId);
					setTimeout(function() {
						var confirmed = confirm(title["gamelose"]);
						if (confirmed) {
							$("#newgame").trigger("click");
						}
					}, 500);
					return;
				}
			}
		}, 1750);
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
		rowIndex = cell.parent().index() - 1,
		table = $("#enemyTable .tr"),
		score = 0;

	if (array[rowIndex][columnIndex]) {
		cell.addClass("hit");
	var isHorizontal = isShipHorizontal(array, rowIndex, columnIndex),
		rowIndex = startingRow(array, rowIndex, columnIndex, isHorizontal),
		columnIndex = startingCol(array, rowIndex, columnIndex, isHorizontal),
		rowLength = shipLength(array, rowIndex, columnIndex, isHorizontal);

		if (isHorizontal) {
			if (isShipDestroyedHorizontal(table, rowIndex, columnIndex, rowLength)) {
				missesFillingHorizontal(table, rowIndex, columnIndex, rowLength);
				hint("userDestroyed");
				if (isUnmuted) {	new Audio("Audio/audioDestroyed.mp3").play();	}
				score = rowLength;
			} else {
				hint("userHit");
				if (isUnmuted) {	new Audio("Audio/audioHit.mp3").play();	}
			}
		} else {
			if (isShipDestroyedVertical(table, rowIndex, columnIndex, rowLength)) {
				missesFillingVertical(table, rowIndex, columnIndex, rowLength);
				hint("userDestroyed");
				if (isUnmuted) {	new Audio("Audio/audioDestroyed.mp3").play();	}
				score = rowLength;
			} else {
				hint("userHit");
				if (isUnmuted) {	new Audio("Audio/audioHit.mp3").play();	}
			}
		}
	} else {
		hint("enemyShot");
		cell.addClass("miss");
		if (isUnmuted) {	new Audio("Audio/audioMiss.mp3").play();	}
		return true;
	}

	if (score) {
		var row = ".row" + score;
		score = $(row).next().find(".score");
		shipAmountTake(score);
	}

	draw("#1af");
	return false;
}

function windowSize() {
	var language = getLanguage(),
		userLi = $(".userInterface li"),
		botLi = $(".botLevel li");

	switch (language) {
		case "english":
			if (window.matchMedia("(max-width: 970px)").matches || window.matchMedia("(max-height: 767px)").matches) {
				userLi.css("margin-left", "25px");
				botLi.css("margin-right", "25px")
					.last().css("margin-right", "20px");
			} else {
				userLi.css("margin-left", "45px");
				botLi
					.css("margin-right", "45px")
					.last().css("margin-right", "30px");;
			}
			break;

		case "ukrainian": 	
			if (window.matchMedia("(max-width: 970px)").matches || window.matchMedia("(max-height: 767px)").matches) {
				userLi.css("margin-left", "20px");
				botLi
					.css("margin-right", "10px")
					.last().css("margin-right", "7px");
			} else {
				userLi.css("margin-left", "40px");
				botLi.css("margin-right", "20px");
			}
			break;

		case "russian":
			if (window.matchMedia("(max-width: 969px)").matches || window.matchMedia("(max-height: 767px)").matches) {
				userLi.css("margin-left", "20px");
				botLi.css("margin-right", "10px");
			} else {
				userLi.css("margin-left", "40px");
				botLi.css("margin-right", "22px");
			}
			break;
	}
}


/* ------------------------ Functions ------------------------ */

// The global variables.
var whatLanguage = "english",
	globalUserArray, globalEnemyArray;

var title = titlesEnglish = {
	"language": "Languages",
	"didyouknow": "did you know?",
	"seabattle": "sea battle",
	"continue": "continue",
	"username": "username",
	"reset": "Reset", 
	"randomise": "Randomise",
	"easy": "Easy",
	"medium": "Medium",
	"hard": "Hard",
	"start": "Start", 
	"newgame": "New game",
	"opponent": "Opponent",
	"shipsleft": "Oppopent's ships left:",
	"gamewin": "Our congratulations, you are winner! Do you want try again?",
	"gamelose": "You have just lost the game. Do you want try again?"
}, titlesUkrainian = {
	"language": "Мови",
	"didyouknow": "а ви знали?",
	"seabattle": "морський бій",
	"continue": "Продовжити",
	"username": "Ім'я користувача",
	"reset": "Очистити", 
	"randomise": "Випадково",
	"easy": "Легкий",
	"medium": "Середній",
	"hard": "Складний",
	"start": "Старт", 
	"newgame": "Нова гра",
	"opponent": "Суперник",
	"shipsleft": "Залишилось суден суперника",
	"gamewin": "Наші вітання, Ви - переможець! Чи хотіли б ви зіграти ще раз?",
	"gamelose": "Ви щойно програли. Хочете переграти?"
},	titlesRussian = {
	"language": "Языки",
	"didyouknow": "а вы знали?",
	"seabattle": "морской бой",
	"continue": "Продолжить",
	"username": "Имя пользователя",
	"reset": "Очистить", 
	"randomise": "Случайно",
	"easy": "Лёгкий",
	"medium": "Средний",
	"hard": "Тяжёлый",
	"start": "Старт",
	"newgame": "Новая игра", 
	"opponent": "Соперник",
	"shipsleft": "Осталось кораблей соперника:",
	"gamewin": "Поздравляем, Вы - победитель! Хотите сыграть ещё раз?",
	"gamelose": "Вы только что проиграли. Хотите переиграть?"
};
	
var hints = hintsEnglish = {
	"ready": "Press \"Start\" button to continue.",
	"notready": "You can't start the game if all the ships weren't set.",
	"reset": "Move the ship on the user field.",
	"placeError": "Select another place.",
	"rotateError": "The ship can't be rotated.",
	"gameStarted": "The game is started. Take a shot!",
	"enemyShot": "You missed. Your opponent is shooting...",
	"userHit": "You hit! Take the shot again.",
	"enemyHit": "He hit. Your opponent is shooting again...",
	"userShot": "He missed. Your turn to shooting.",
	"userDestroyed": "You have destroyed the ship. Take your shot.",
	"enemyDestroyed": "You opponent has destroyed the ship. He is shooting again..."
}, hintsUkrainian = {
	"ready": "Нажміть \"Старт\", щоб продовжити.",
	"notready": "Ви не можете розпочати гру, поки не встановили всі судна.",
	"reset": "Перетягніть судно на Ваше ігрове поле.",
	"placeError": "Виберіть інакше місце.",
	"rotateError": "Судно не можна повернути.",
	"gameStarted": "Гра розпочалась. Стріляйте!",
	"enemyShot": "Ви промахнулись. Хід суперника...",
	"userHit": "Ви влучили! Ваш хід.",
	"enemyHit": "Суперник влучив. Хід суперника...",
	"userShot": "Суперник промахнувся. Ваш хід.",
	"userDestroyed": "Ви знищили судно. Ваш хід.",
	"enemyDestroyed": "Ваш суперник знищив корабель. Хід суперника..."
}, hintsRussian = {
	"ready": "Нажмите \"Старт\" для продолжения.",
	"notready": "Вы не можете начать игру, пока не установлены все корабли.",
	"reset": "Перетяните корабль на Ваше игровое поле.",
	"placeError": "Выберите другое место.",
	"rotateError": "Корабль нельзя повернуть.",
	"gameStarted": "Игра началась. Стреляйте!",
	"enemyShot": "Вы промахнулись. Ход соперника...",
	"userHit": "Вы попали! Ваш ход.",
	"enemyHit": "Соперник попал. Ход соперника...",
	"userShot": "Соперник промазал. Ваш ход.",
	"userDestroyed": "Вы уничтожили корабль. Ваш ход.",
	"enemyDestroyed": "Ваш соперник уничтожил корабль. Ход соперника..."
};

var know = knowEnglish = [
	"You are welcome in SEA BATTLE game. We wish you the best of luck!",
	"The game of Battleship is thought to have its origins in the French game L'Attaque played during World War I, although parallels have also been drawn to E. I. Horseman's 1890 game Baslinda. The first commercial version of the game was Salvo, published in 1931 in the United States by the Starex company.",
	"You can rotate the ship on the left by clicking left mouse button or on the right by clicking right mouse button.  It works as long as you don't press \"Start\" button",
	"Easy bot doesn't even know if he hit or missed.",
	"To contact with developer write on dnddtw@gmail.com.",
	"You can set the ships whereever you want if you click on \"Reset\" button.",
	"You can't remove the ship from the user field if it was set. Press \"Reset\" button for new setting.",
	"The game is still being developed.",
	"If you click on \"Did you know?\" heading the message will be changed.",
	"The population in the world is currently 7.5 bullion persons as of 2017",
	"You can choose the bot's difficulty level on the right side of screen.",
	"You can turn on the sound effects by clicking on the icon.",
	"Release version and other you can find on https://github.com/Dnddtw/SeaBattle"
],	knowUkrainian = [
	"Ласково просимо до гри МОРСЬКИЙ БІЙ. Бажаємо Вам успіху!",
	"Гра Морський бій, як вважають, має свої витоки від французької гри L'Attaque, в яку грали під час Першої світової війни, хоча паралелі також було звернуто на гру Baslinda у 1980 році. Перша комерційна версія гри була Salvo, опублікована в 1931 році в Сполучених Штатах Америки компанією Starex.",
	"Ви можете повернути судно наліво натиснувши ліву клавішу мишки, та направо - праву клавішу мишки. Такі функції доступні лише коли ви встановлюєте судна власноруч.",
	"Легкий бот навіть не знає влучив він в судно чи ні.",
	"Для зв'язку з автором гри, Ви можете відправити лист на пошту dnddtw@gmail.com.",
	"Ви можете власноруч встановити всі судна натиснувши на кнопку \"Очистити\".",
	"Ви не можете видалити судно, якщо вже встановили його на своє ігрове поле. Натисніть кнопку \"Очистити\", щоб розпочати встановлення спочатку.",
	"Гра все ще знаходиться в стані розробки.",
	"Натиснувши на заголовок \"А Ви знали?\" - повідомлення зміниться.",
	"Станом на 2017 рік, населення нашої планети становить 7.5 мільярдів осіб.",
	"Ви можете обрати складність бота в правій частині екрану.",
	"Ви моежете увімкнути звукові еффекти настивнувши на відповідну іконку.",
	"Кінцеву версію та інше Ви зможете знайти на  https://github.com/Dnddtw/SeaBattle"
],	knowRussian = [
	"Добро пожаловать в игру МОРСКОЙ БОЙ. Желаем Вам успеха!",
	"Игра Морской бой, как полагают, имеет свои истоки от французской игры L'Attaque, в которую играли во время Первой мировой войны, хотя параллели также было обращены на игру Baslinda в 1980 году. Первая коммерческая версия игры была Salvo, опубликованная в 1931 году в Соединённых Штатах Америки компанией Starex.",
	"Вы можете повернуть корабль налево нажав левую клавишу мышки, и направо - правую клавишу мышки. Эти функции доступны только в режиме установки кораблей.",
	"Легкий бот даже не знает попал ли он в корабль или нет.",
	"Чтобы связаться с автором игры, Вы можете отправить письмо на почту dnddtw@gmail.com.",
	"Вы можете самостоятельно установить все корабли нажав на кнопку \"Очистить\".",
	"Вы не можете удалить корабль, если уже установили его на своё игровое поле. Нажмите кнопку \"Очистить\", чтобы начать установку сначало.",
	"Игра все ещё находится в состоянии разработки.",
	"Нажав на заголовок \"А Вы знали?\" - сообщение измениться.",
	"На состояние 2017 года, население нашей планеты составляет 7.5 миллиардов человек.",
	"Вы можете выбрать сложность бота в правой часте экрана.",
	"Вы моежете включить звуковые эффекты нажав на соответствующую иконку.",
	"Конечную версию и другое Вы сможете найти на https://github.com/Dnddtw/SeaBattle"
];

var used = [0, 4, 8], userShips = [4, 3, 2, 1], knowId, isUnmuted = true, Grow, Gcolumn, horizontal, isDestroyed = true;

$(document).ready(function() {

	$(window).resize(windowSize);

	var songs = [
			"Audio/Alan Walker - Hymn For The Weekend.mp3",
			"Audio/The Band Perry - If I Die Young.mp3",
			"Audio/Kygo ft. Selena Gomez - It Ain't Me.mp3"
		],
		songIndex = getRandomNumber(3),
		audio = new Audio(songs[songIndex]);
	
	audio.volume = 0.5;
	audio.defaultMuted = false;
	audio.onended = function() {
		$("#nextSong").trigger("click");
	}


	$("#english").on("click", function() {
		var isNotActive = !($(this).hasClass("active"));
		if (isNotActive) {
			languages("english");
		}
	});

	$("#ukrainian").on("click", function() {
		var isNotActive = !($(this).hasClass("active"));
		if (isNotActive) {
			languages("ukrainian");
		}
	});

	$("#russian").on("click", function() {
		var isNotActive = !($(this).hasClass("active"));
		if (isNotActive) {
			languages("russian");
		}
	});

	$("#didyouknow h3").on("click", function() {
		clearInterval(knowId);
		didyouknow();
		knowId = setInterval(didyouknow, 40000);
		
	});

	$('#beforeGameButton').click(function(event) {
		var startForm = $('#startForm'),
			game = $('#game'),
			username = $("#username").val(),
			userCaption = $('#userCaption'),
			knowId = setInterval(didyouknow, 40000);

		if (username) {
			handler();
			startForm.hide("fast");
			game.show("fast");	
			$("#didyouknow").show();
			$(userCaption).text(username);
		} else {
			$("#username").focus();
		}

	});

function handler() {
	totalClear();
	userShips = [4, 3, 2, 1];
	globalUserArray = newEmptyArray()
	globalEnemyArray = randomArrayFilling();
	fullRandomFilling();
	hint("ready");

	$("#randomise").on("click", function() {
		var draggableRows = $(".row");

		unavailableRow(draggableRows);
		draggableRows.draggable();
		draggableRows.draggable("destroy");
		fullRandomFilling();
		scoreZero();
		hint("ready");
	});

	$("#userTable").on("contextmenu", ".cell:not(.userCell)", function() {
		return false;
	});



	$("#reset").on("click", function() {
		var userShipsArray = newEmptyArray(),
			droppableUser = $("#userField table"),
			draggableRows = $("#enemyDestroyedShips .row");

		fullClear();
		draggableRows.draggable();
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

	$("#game .botLevel").on("click", "li", function() {
		$(this)
			.parent()
			.find("span")
			.removeClass("active");
		$(this).find("span").addClass("active");
	});

	$("#start").on("click", function() {
		if (canIStart()) {
			$("#reset").off("click");
			$("#randomise").off("click");
			$("#userField")
				.off("contextmenu", ".userCell", shipTurningRight)
				.off("click", ".userCell", shipTurning);
			$("#enemyTable").addClass("hoverActive");
			$(this).off("click").fadeOut("slow", function() {
				// margin: #enemyDestroyedShips souldn't be moved (margin-top + buttonHeight + margin-bottom) (for different window's sizes)
				var margin = parseInt($("#start").css("margin-bottom")) + parseInt($("#start").css("height")) + parseInt($("#start").css("margin-top"));
				$("#enemyDestroyedShips").css("marginTop", margin);
			});
			$("#userTable .userCell").css("background-color", "#1af");
			$("#heading").fadeIn("slow");
			$("#game .botLevel").off("click", "li");
			$("#newgame").show(25);
			
			scoreStart();
			hint("gameStarted");
			destroyedShipsEnable();			
		} else {
			hint("notready");
		}

		var difficulty = $("#easy").hasClass("active") ? "easy" : 
					   $("#medium").hasClass("active") ? "medium" : "hard";
		if (difficulty == "easy"){
			$("#enemyField").on("click", ".enemyCell", easyBot);
		} else if (difficulty == "medium") {
			$("#enemyField").on("click", ".enemyCell", mediumBot);
		} else {
			$("#enemyField").on("click", ".enemyCell", hardBot);
		}
	});

}

	$("#newgame").on("click", function() {
		$(this).fadeOut("slow", function() {
			var margin = parseInt($("#start").css("margin-bottom")) - parseInt($("#start").css("height")) + parseInt($("#start").css("margin-top"));
			$("#enemyDestroyedShips").css("marginTop", "0px");
			$("#start").fadeIn("slow");
		});
		$("#heading").hide("fast");
		$("#enemyTable").removeClass("hoverActive");
		handler();
		$("#randomise").trigger("click");
	});

	$("#turn").on("click", function() {
		var onoroff = $(this).attr("src"),
			str = "Images/audioOFF.png";
		if (onoroff == str) {
			$(this).attr("src", "Images/audioON.png");
			isUnmuted = true;
			audio.muted = false;
		} else {
			$(this).attr("src", "Images/audioOFF.png");
			isUnmuted = false;
			audio.muted = true;
			audio.defaultMuted = false;
		}
	});

	$("#play").on("click", function() {
		var onoroff = $(this).attr("src"),
			str = "Images/play.png";
		if (onoroff == str) {
			$(this).attr("src", "Images/pause.png");
			audio.play();
		} else {
			$(this).attr("src", "Images/play.png");
			audio.pause();
		}
	});

	$("#nextSong").on("click", function() {
		var str = "Images/pause.png";
		if (songIndex == songs.length - 1) {
			songIndex = 0;
			audio.src = songs[songIndex];
		} else {
			songIndex++;
			audio.src = songs[songIndex];
		}
		audio.load();
		if ($("#play").attr("src") == str) {
			audio.play();
		}
	});	

	$("#prevSong").on("click", function() {
		var str = "Images/pause.png";
		if (songIndex == 0) {
			songIndex = songs.length - 1;
			audio.src = songs[songIndex];
		} else {
			songIndex--;
			audio.src = songs[songIndex];
		}
		audio.load();
		if ($("#play").attr("src") == str) {
			audio.play();
		}

	});	

	$("#audio .volume").mousemove(function(){
   		audio.volume = parseFloat(this.value / 10);
	});

	$("#username").keydown(function(event) {
	    if (event.keyCode == 13) {
	        event.preventDefault();
	        $("#beforeGameButton").trigger("click");
	    }
	});
});