export enum ServerMessageType
	{
	Fail,
	Error,
	Warning,
	Notify,
	Message,
	Question,
	QuestionTimedOut,
	End
	}

export interface ServerMessage
	{
	text: string;
	type: ServerMessageType;
	}

export interface ISpaceifyHandler
	{
	fail();
	error(errors);
	warning(message, code);
	notify(message, code);
	message(message);
	question(message, choices, origin, answerId);
	questionTimedOut(message, origin, answerId);
	end(message);
	}

export class SpaceifyHandler implements ISpaceifyHandler
{
private _serverMessages: ServerMessage[] = [];

get serverMessages() : ServerMessage[]
	{
	return this._serverMessages;
	}

clearMessages()
	{
	this._serverMessages = [];
	}

fail()
	{
	console.log("Application manager: connection failed");
	}

error(errors)
	{
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

	for(let err of errors)
		{
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
	}

warning(message, code)
	{
	console.log(code, message);

	var serverMessage = { text: code + " " + message, type: ServerMessageType.Warning };
	this._serverMessages.push(serverMessage);
	}

notify(message, code)
	{
	console.log(code, message);

	var serverMessage = { text: code + " " + message, type: ServerMessageType.Notify };
	this._serverMessages.push(serverMessage);
	}

message(message)
	{ // General messages from the Application manager
	console.log(message);

	var serverMessage = { text: message, type: ServerMessageType.Message };
	this._serverMessages.push(serverMessage);
	}

question(message, choices, origin, answerId)
	{ // Questions from the Application manager
	console.log(message);

	for (var i = 0; i < choices.length; i++)
		{
		console.log("<div><button onclick=\"sam.answer('" + choices[i].short + "', '" + answerId + "');\">" + choices[i].screen + "</button></div>");
		}
	}

questionTimedOut(message, origin, answerId)
	{ // Application manager does't wait answers to questions forever
	console.log(message);
	}

end(message)
	{
	
	}

}
