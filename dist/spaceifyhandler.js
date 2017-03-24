"use strict";
var ServerMessageType;
(function (ServerMessageType) {
    ServerMessageType[ServerMessageType["Fail"] = 0] = "Fail";
    ServerMessageType[ServerMessageType["Error"] = 1] = "Error";
    ServerMessageType[ServerMessageType["Warning"] = 2] = "Warning";
    ServerMessageType[ServerMessageType["Notify"] = 3] = "Notify";
    ServerMessageType[ServerMessageType["Message"] = 4] = "Message";
    ServerMessageType[ServerMessageType["Question"] = 5] = "Question";
    ServerMessageType[ServerMessageType["QuestionTimedOut"] = 6] = "QuestionTimedOut";
    ServerMessageType[ServerMessageType["End"] = 7] = "End";
})(ServerMessageType = exports.ServerMessageType || (exports.ServerMessageType = {}));
var SpaceifyHandler = (function () {
    function SpaceifyHandler() {
        this._serverMessages = [];
    }
    Object.defineProperty(SpaceifyHandler.prototype, "serverMessages", {
        get: function () {
            return this._serverMessages;
        },
        enumerable: true,
        configurable: true
    });
    SpaceifyHandler.prototype.clearMessages = function () {
        this._serverMessages = [];
    };
    SpaceifyHandler.prototype.fail = function () {
        console.log("Application manager: connection failed");
    };
    SpaceifyHandler.prototype.error = function (errors) {
        console.log(errors);
        //$("#adminContainerRight").append($("<div><h3>There were " + errors.length + " error(s) during the operation:</h3></div><br>"));
        /*
        for (var i = 0; i < errors.length; i++)
            {
            for (var j = 0; j < errors[i].messages.length; j++)
                {
                //$("#adminContainerRight").append($("<div style='color: #f00; font-weight: bold;'><i>" + errors[i].codes[j] + "</i> <b>" + errors[i].messages[j] + "</b></div><br>"));
                console.log(errors[i].codes[j]+" "+errors[i].messages[j]);
                }
            }
            */
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var err = errors_1[_i];
            /*
            for (var i = 0; i < err.messages.length; i++)
                {
                console.log(err.codes[i] + err.messages[i]);
                }
            */
            console.log(err.code, err.message);
            var serverMessage = { text: err.code + " " + err.message, type: ServerMessageType.Error };
            this._serverMessages.push(serverMessage);
        }
    };
    SpaceifyHandler.prototype.warning = function (message, code) {
        console.log(code, message);
        var serverMessage = { text: code + " " + message, type: ServerMessageType.Warning };
        this._serverMessages.push(serverMessage);
    };
    SpaceifyHandler.prototype.notify = function (message, code) {
        console.log(code, message);
        var serverMessage = { text: code + " " + message, type: ServerMessageType.Notify };
        this._serverMessages.push(serverMessage);
    };
    SpaceifyHandler.prototype.message = function (message) {
        console.log(message);
        var serverMessage = { text: message, type: ServerMessageType.Message };
        this._serverMessages.push(serverMessage);
    };
    SpaceifyHandler.prototype.question = function (message, choices, origin, answerId) {
        console.log(message);
        for (var i = 0; i < choices.length; i++) {
            console.log("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>");
        }
    };
    SpaceifyHandler.prototype.questionTimedOut = function (message, origin, answerId) {
        console.log(message);
    };
    SpaceifyHandler.prototype.end = function (message) {
    };
    return SpaceifyHandler;
}());
exports.SpaceifyHandler = SpaceifyHandler;
//# sourceMappingURL=spaceifyhandler.js.map