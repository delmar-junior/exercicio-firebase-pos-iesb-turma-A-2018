const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.onTaskCreate = functions 
    .database
    .ref('tasks/{taskId}')
    .onCreate((snapshot, context) => {
        const json = snapshot.val();
        const key  = context.params.taskId;
        const newObj = {
            createdAt: context.timestamp
        }
        const log = Object.assign(newObj, json);
        return admin.database()
            .ref(`/logs/${key}`)
            .set(log); 
    });

exports.onTaskDelete = functions 
    .database
    .ref('tasks/{taskId}')
    .onDelete((snapshot, context) => {
        const json = snapshot.val();
        const key  = context.params.taskId;
        const newObj = {
            deletedAt: context.timestamp
        }
        const log = Object.assign(newObj, json);
        return admin.database()
            .ref(`/logs/${key}`)
            .set(log); 
    });
 
exports.onTaskUpdate = functions 
    .database
    .ref('tasks/{taskId}')
    .onUpdate((snapshot, context) => {
        const json = snapshot.val();
        const key  = context.params.taskId;
        const newObj = {
            UpdatedAt: context.timestamp
        }
        const log = Object.assign(newObj, json);
        return admin.database()
            .ref(`/logs/${key}`)
            .set(log); 
    });