// backend/src/utils/notificationHelper.js

const EventEmitter = require('events');

class NotificationService extends EventEmitter {
  constructor() {
    super();
  }

  // Send a notification to a specific user
  sendNotification(userId, message) {
    this.emit('notification', { userId, message });
  }

  // Subscribe to notifications
  subscribe(callback) {
    this.on('notification', callback);
  }
}

const notificationService = new NotificationService();

module.exports = notificationService;
