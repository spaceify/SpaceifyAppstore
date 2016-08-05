export enum ServerMessageType {
    Message,
    Warning,
    Notification,
    Error
}


export interface ServerMessage{
	text: string;
	type: ServerMessageType;
}


export interface ISpaceifyHandler {

	failed();
	error(errors) 
	warning(message, code) 
	notify(message, code) 
	message(message) 
	question(question, choices, origin, answerId)
	questionTimedOut(message, origin, answerId) 


}

export class SpaceifyHandler implements ISpaceifyHandler {

	private _serverMessages: ServerMessage[] = [];

	get serverMessages() : ServerMessage[]{
		return this._serverMessages;
  	}

  	clearMessages(){

		this._serverMessages = [];

  	}

	failed() {
		console.log("Application manager: connection failed");
			//$("#adminContainerRight").append($("<div>Setting up the messaging connection failed. There will be no messages or questions from the Application Manager.</div>"));
	}

	error(errors) {
		
		//$("#adminContainerRight").append($("<div><h3>There were " + errors.length + " error(s) during the operation:</h3></div><br>"));
		/*
		for (var i = 0; i < errors.length; i++) {
			for (var j = 0; j < errors[i].messages.length; j++){
				//$("#adminContainerRight").append($("<div style='color: #f00; font-weight: bold;'><i>" + errors[i].codes[j] + "</i> <b>" + errors[i].messages[j] + "</b></div><br>"));
				console.log(errors[i].codes[j]+" "+errors[i].messages[j]);
			}
		}
		*/

		for(let err of errors){
			/*
			for (var i = 0; i < err.messages.length; i++){
				console.log(err.codes[i] + err.messages[i]);
			}
			*/

			var serverMessage = { text: err.code + " " + err.message, type: ServerMessageType.Error };

			console.log(err.code+ " " +err.message);
			//this._serverMessages.push(err.code + ": " + err.message);
			this._serverMessages.push(serverMessage);

		}

	}

	warning(message, code) {

		console.log(code +" "+message);


		//this._serverMessages.push(code + ": " + message);

		var serverMessage = { text: code + " " + message, type: ServerMessageType.Warning };
		this._serverMessages.push(serverMessage);

		
			
	}

	notify(message, code) {
			//$("#adminContainerRight").append($("<div style='color: #32af32;'><br>" + message + "<br></div>"));
		console.log(code +" "+message);
		//this._serverMessages.push(code + ": " + message);

		var serverMessage = { text: code + " " + message, type: ServerMessageType.Notification };
		this._serverMessages.push(serverMessage);
	}

	message(message) {
		//<!--General messages from the Application manager -- >
		//	$("#adminContainerRight").append($("<div>" + (message != "" ? message : "<br>") + "</div>"));
		console.log(message);

		var serverMessage = { text: message, type: ServerMessageType.Message };
		this._serverMessages.push(serverMessage);
	}

	question(question, choices, origin, answerId) {
		//<!--Questions from the Application manager -- >
		//	$("#adminContainerRight").append($("<div>" + question + "<br>" + "</div>"));
		console.log(question);
		for (var i = 0; i < choices.length; i++){
			//$("#adminContainerRight").append($("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>"));
			console.log("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>");

		}
	}

	questionTimedOut(message, origin, answerId) {
		//<!--Application manager does't wait forever answers to questions -->
		console.log(message);
	}


}
