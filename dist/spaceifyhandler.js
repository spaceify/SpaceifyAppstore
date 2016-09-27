"use strict";
(function (ServerMessageType) {
    ServerMessageType[ServerMessageType["Message"] = 0] = "Message";
    ServerMessageType[ServerMessageType["Warning"] = 1] = "Warning";
    ServerMessageType[ServerMessageType["Notification"] = 2] = "Notification";
    ServerMessageType[ServerMessageType["Error"] = 3] = "Error";
})(exports.ServerMessageType || (exports.ServerMessageType = {}));
var ServerMessageType = exports.ServerMessageType;
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
    SpaceifyHandler.prototype.failed = function () {
        console.log("Application manager: connection failed");
        //$("#adminContainerRight").append($("<div>Setting up the messaging connection failed. There will be no messages or questions from the Application Manager.</div>"));
    };
    SpaceifyHandler.prototype.error = function (errors) {
        //$("#adminContainerRight").append($("<div><h3>There were " + errors.length + " error(s) during the operation:</h3></div><br>"));
        /*
        for (var i = 0; i < errors.length; i++) {
            for (var j = 0; j < errors[i].messages.length; j++){
                //$("#adminContainerRight").append($("<div style='color: #f00; font-weight: bold;'><i>" + errors[i].codes[j] + "</i> <b>" + errors[i].messages[j] + "</b></div><br>"));
                console.log(errors[i].codes[j]+" "+errors[i].messages[j]);
            }
        }
        */
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var err = errors_1[_i];
            /*
            for (var i = 0; i < err.messages.length; i++){
                console.log(err.codes[i] + err.messages[i]);
            }
            */
            var serverMessage = { text: err.code + " " + err.message, type: ServerMessageType.Error };
            console.log(err.code + " " + err.message);
            //this._serverMessages.push(err.code + ": " + err.message);
            this._serverMessages.push(serverMessage);
        }
    };
    SpaceifyHandler.prototype.warning = function (message, code) {
        console.log(code + " " + message);
        //this._serverMessages.push(code + ": " + message);
        var serverMessage = { text: code + " " + message, type: ServerMessageType.Warning };
        this._serverMessages.push(serverMessage);
    };
    SpaceifyHandler.prototype.notify = function (message, code) {
        //$("#adminContainerRight").append($("<div style='color: #32af32;'><br>" + message + "<br></div>"));
        console.log(code + " " + message);
        //this._serverMessages.push(code + ": " + message);
        var serverMessage = { text: code + " " + message, type: ServerMessageType.Notification };
        this._serverMessages.push(serverMessage);
    };
    SpaceifyHandler.prototype.message = function (message) {
        //<!--General messages from the Application manager -- >
        //	$("#adminContainerRight").append($("<div>" + (message != "" ? message : "<br>") + "</div>"));
        console.log(message);
        var serverMessage = { text: message, type: ServerMessageType.Message };
        this._serverMessages.push(serverMessage);
    };
    SpaceifyHandler.prototype.question = function (question, choices, origin, answerId) {
        //<!--Questions from the Application manager -- >
        //	$("#adminContainerRight").append($("<div>" + question + "<br>" + "</div>"));
        console.log(question);
        for (var i = 0; i < choices.length; i++) {
            //$("#adminContainerRight").append($("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>"));
            console.log("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>");
        }
    };
    SpaceifyHandler.prototype.questionTimedOut = function (message, origin, answerId) {
        //<!--Application manager does't wait forever answers to questions -->
        console.log(message);
    };
    return SpaceifyHandler;
}());
exports.SpaceifyHandler = SpaceifyHandler;
//# sourceMappingURL=spaceifyhandler.js.map