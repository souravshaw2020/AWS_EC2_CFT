var AWS = require("aws-sdk");
AWS.config.update({
    region: "ap-south-1"
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    console.log(JSON.stringify(event));
    //return;
    var params = {
        TableName: "EC2StateChange007",
        Item: {
            "instance_id": event.detail['instance-id'],
            "type": event['detail-type'],
            "time": event.time,
            "state": event.detail.state

        },
        // ConditionExpression: 'attribute_not_exists(instance_id)',
        // UpdateExpression: 'SET state = event.detail.state'
    }
    await docClient.put(params).promise().then((data, err) => {
        if(err){
            return err;
        }
        else{
            console.log(data);
        }
    })
}
   