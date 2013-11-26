var util = require('util'), events = require('events');

/**
 * If safety is activated, no command will be provide from the controller
 */
var SAFETY = true;
//var READY = false;
var positions = {
	'X' : 1500,
	'Y' : 1500,
	'Z' : 1500,
	'T' : 1000
};
/**
 * This Controller provide mapping from the XBOX controller.
 */
var CONTROLLER = {
	AXIS : {
		LEFTX : 0,
		LEFTY : 1,
		RIGHTX : 2,
		RIGHTY : 3
	},
	BUTTONS : {
		A : 0,
		B : 1,
		X : 2,
		Y : 3,
		LB : 4,
		RB : 5,
		LEFTT : 6,
		RIGHTT : 7,
		BACK : 8,
		START : 9

	}
};

/**
 * The controller provide 2 mode
 * NORMAL : mean the right trigger control the throttle depending the state of the trigger
 * INCREMENT : mean the left and right trigger control the throttle by incrementation. left trigger reduce the throttle and right trigger increase the throttle.
 */
var MODE = {
	NORMAL : 1,
	INCREMENT : 2
};

/**
 * Min and max values from the quadcopter
 */
var quadMaxValue = 2000, quadMinValue = 1000;

/**
 * Min and max value sent from the xbox controller
 */
var maxValue = 1, minValue = -maxValue;

// init variables
var currentMode = MODE.NORMAL;
var holdThrottle = false;

var currentThrottle = quadMinValue;
var currentThrottleOnHold = quadMinValue;

var incrementSpeed = 20;


var lastStatesAxis = {
	LEFTX : 0,
	LEFTY : 0,
	RIGHTX : 0,
	RIGHTY : 0,
	LEFTT : 0,
	RIGHTT : 0
};
//-------

function Joystick() {
	events.EventEmitter.call(this);

	Joystick.prototype.updateJoystick = function(data) {
		var self = this;

		//button LB we hold the throttle
		if (data.buttons[CONTROLLER.BUTTONS.LB] == 1 && currentMode == MODE.NORMAL && !SAFETY) {
			holdThrottle = !holdThrottle;
			console.log("hold throttle : " + holdThrottle);

			if (holdThrottle) {
				currentThrottleOnHold = currentThrottle;
				console.log("holding throttle on :" + currentThrottleOnHold);
			} else {
				positions['T'] = currentThrottle;
			}
		}

		//button A we change the mode between INCREMENT AND NORMAL
		if (data.buttons[CONTROLLER.BUTTONS.A] == 1 && !SAFETY) {
			currentMode = currentMode == MODE.NORMAL ? MODE.INCREMENT : MODE.NORMAL;
			console.log("new mode : " + (currentMode == MODE.NORMAL ? "Normal" : "Increment"));

			if (currentMode == MODE.INCREMENT && holdThrottle) {
				holdThrottle = false;
				currentThrottle = currentThrottleOnHold;
				console.log("hold Throttle off");
			}
			if (currentMode == MODE.NORMAL) {
				holdThrottle = true;
				currentThrottleOnHold = currentThrottle;
				console.log("hold Throttle On : " + currentThrottleOnHold);
			}
		}

		//button X we shutdown throttle and put safety back
		if (data.buttons[CONTROLLER.BUTTONS.X] == 1) {
			currentThrottle = 1000;
			currentThrottleOnHold = 1000;
			currentMode = MODE.NORMAL;
			holdThrottle = false;
			SAFETY = true;
			positions['T'] = currentThrottle;
			console.log("killing the engine and putting safety on!");
		}

		//button back, we put safety off
		if (data.buttons[CONTROLLER.BUTTONS.BACK] == 1 && SAFETY) {
			SAFETY = false;
			console.log("safety off");
		}

		//button start we send the arming command (throttle 1000 and LEFTX 2000)
		if (data.buttons[CONTROLLER.BUTTONS.START] == 1 && !SAFETY) {
			positions['T'] = quadMinValue + 105;
			positions['Z'] = quadMaxValue;
			// wait 1 sec, and put X to 1500;
			setTimeout(function() {
				var middleValue = ((quadMaxValue - quadMinValue) / 2) + quadMinValue;
				positions['X'] = middleValue;
				positions['Y'] = middleValue;
				positions['Z'] = middleValue;
				positions['T'] = quadMinValue;
				self.emit('data', positions);
			}, 1500);
			console.log("arming quadcopter");
		}

		//if safety is activated we leave!
		if (SAFETY) {
			self.emit('data', positions);
			return;
		}

		/**
		 * AXIS HERE
		 */
		//throttle code
		if (data.buttons[CONTROLLER.BUTTONS.LEFTT] != lastStatesAxis.LEFTT || data.buttons[CONTROLLER.BUTTONS.RIGHTT] != lastStatesAxis.RIGHTT) {
			if (currentMode == MODE.NORMAL) {
				if (data.buttons[CONTROLLER.BUTTONS.RIGHTT] != lastStatesAxis.RIGHTT && !holdThrottle) {
					currentThrottle = parseInt(1000 + (data.buttons[CONTROLLER.BUTTONS.RIGHTT]*1000)).toFixed(0);
					lastStatesAxis.RIGHTT = data.buttons[CONTROLLER.BUTTONS.RIGHTT];
					if (!holdThrottle) {
						positions['T'] = currentThrottle;
					}
				}
			} else {
				//INCREMENT MODE
				var value = 0;
				if (data.buttons[CONTROLLER.BUTTONS.LEFTT] != lastStatesAxis.LEFTT) {
					value = incrementValue(data.buttons[CONTROLLER.BUTTONS.LEFTT], true);
					lastStatesAxis.LEFTT = data.buttons[CONTROLLER.BUTTONS.LEFTT];
				} else {
					value = incrementValue(data.buttons[CONTROLLER.BUTTONS.RIGHTT], false);
					lastStatesAxis.RIGHTT = data.buttons[CONTROLLER.BUTTONS.RIGHTT];
				}

				if (value != 0) {
					if ((currentThrottle + value) < quadMinValue) {
						if (currentThrottle != quadMinValue) {
							currentThrottle = quadMinValue;
						}
					} else if ((currentThrottle + value) > quadMaxValue) {
						if (currentThrottle != quadMaxValue) {
							currentThrottle = quadMaxValue;
						}
					} else {
						currentThrottle += value;
					}
					positions['T'] = currentThrottle;
				}
			}
		} else {
			if (data.axes[CONTROLLER.AXIS.LEFTX] != lastStatesAxis.LEFTX) {
				var quadValue = parseInt(convertValueToQuadValue(data.axes[CONTROLLER.AXIS.LEFTX]).toFixed(0));
				console.log("axis = X; value = " + quadValue);
				positions['Z'] = quadValue;
			}
			if (data.axes[CONTROLLER.AXIS.RIGHTY] != lastStatesAxis.RIGHTY) {
				var value = data.axes[CONTROLLER.AXIS.RIGHTY] * -1;
				var quadValue = parseInt(convertValueToQuadValue(value).toFixed(0));
				console.log("axis = Y; value = " + quadValue);
				positions['Y'] = quadValue;
			}
			if (data.axes[CONTROLLER.AXIS.RIGHTX] != lastStatesAxis.RIGHTX) {
				var quadValue = parseInt(convertValueToQuadValue(data.axes[CONTROLLER.AXIS.RIGHTX]).toFixed(0));
				console.log("axis = Z; value = " + quadValue);
				positions['X'] = quadValue;
			}
		}

		self.emit('data', positions);

	};
}

/**
 * Convert value from controller to a value for the quadcopter
 * @method convertValueToQuadValue
 * @param {Number} value value from the controller
 */
function convertValueToQuadValue(value) {
	if (value > 0) {
		return (value * 500) + 1500;
	} else if (value < 0) {
		return 1500 - ((value * -1) * 500);
	} else {
		return 1500;
	}
}

var lastInc = {
	left : 0,
	right : 0
};

/**
 * Take the new value and use the difference between last value and new value to create a speed value.
 * @method incrementValue
 * @param {Number} value
 * @param {Boolean} left
 * @return {Number} return value to add to current throttle
 */
function incrementValue(value, left) {
	var newValue = parseInt(convertValueToQuadValue(value).toFixed(0));
	var ratio = (newValue - quadMinValue) / quadMinValue;

	if (ratio < lastInc[( left ? "left" : "right")]) {
		lastInc[( left ? "left" : "right")] = ratio;
		return 0;
	}
	lastInc[( left ? "left" : "right")] = ratio;
	var speed = (ratio * incrementSpeed);
	speed = parseInt(speed.toFixed(0));
	return left == true ? speed * -1 : speed;
}

util.inherits(Joystick, events.EventEmitter);

module.exports = Joystick;
