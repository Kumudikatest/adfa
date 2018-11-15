let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
    console.log("Received request with payload", event);
    let operation = event.Operation;
    let id = event.ID;
    let result = null;
    switch (operation) {
        case "Add":
            result = event.LeftParameter + event.RightParameter;
            break;
        case "Subtract":
            result = event.LeftParameter - event.RightParameter;
            break;
        case "Multiply":
            result = event.LeftParameter * event.RightParameter;
            break;
        case "Devide":
            result = event.LeftParameter / event.RightParameter;
            break;
        case "Mod":
            result = event.LeftParameter % event.RightParameter;
            break;
        default:
            result = "Operation Not Permitted";
            break;
    }
    event.Result = result;

    ddb.put({
        TableName: 'Cal',
        Item: { 
            'ID': id, 'Result': result, 'Operation': operation 
            }
    
            }).promise().then(function (data) {
    //your logic goes here
    console.log(data);
    
}).catch(function (err) {
    //handle error
    console.log(err);
});

callback(null, { "message": "Successfully executed" });
}