﻿function TouchController(StartMovement, StopMovement) {
    var that = this,
        canvas = document.getElementById("game"),
        currentTouchID = false,
        movementTouchStart,
        movementTouch,
        topOffset = HeightOffset($("#shipStats"));

    function HandleStart(touch) {
        if (!currentTouchID && touch.clientX <= ($("#game").width() / 2)) {
            currentTouchID = touch.identifier;
            movementTouchStart = { X: touch.clientX, Y: touch.clientY - topOffset };
            movementTouch = { X: touch.clientX, Y: touch.clientY - topOffset };
        }
    }

    function HandleMove(touch) {
        if (currentTouchID === touch.identifier) {
            movementTouch.X = touch.clientX;
            movementTouch.Y = touch.clientY - topOffset;
            return true;
        }

        return false;
    }

    function HandleStop(touch) {
        if (currentTouchID === touch.identifier) {
            currentTouchID = false;
            return true;
        }

        return false;
    }

    function TouchStart(e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            HandleStart(touch);
        }
    }

    function TouchMove(e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            if (HandleMove(touch)) {
                break;
            }
        }
    }

    function TouchEnd(e) {
        e.preventDefault();

        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];

            if (HandleStop(touch)) {
                break;
            }
        }
    }

    canvas.addEventListener('touchstart', TouchStart, false);
    canvas.addEventListener('touchmove', TouchMove, false);
    canvas.addEventListener('touchend', TouchEnd, false);

    var mouseGUIDS = 0,
        currentGUID = 0;

    function MouseDown(e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID = mouseGUIDS++;
        HandleStart(e);
    }

    function MouseMove(e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID;
        HandleMove(e);
    }

    function MouseUp(e) {
        e.preventDefault();

        var touch = e;

        e.identifier = currentGUID;
        HandleStop(e);
    }

    canvas.addEventListener('mousedown', MouseDown, false);
    canvas.addEventListener('mousemove', MouseMove, false);
    canvas.addEventListener('mouseup', MouseUp, false);

    that.Draw = function () {
        if (currentTouchID) {
            CanvasContext.drawCircle(movementTouchStart.X, movementTouchStart.Y, 40, 6, "#1BFF27");
            CanvasContext.drawCircle(movementTouchStart.X, movementTouchStart.Y, 60, 2, "#1BFF27");
            CanvasContext.drawCircle(movementTouch.X, movementTouch.Y, 40, 2, "#2EBD15");
            CanvasContext.drawLine(movementTouchStart.X, movementTouchStart.Y, movementTouch.X, movementTouch.Y, 2, "#4A993C");
        }
    }
}