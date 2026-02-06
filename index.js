const webpush = require('web-push');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ВСТАВЬ СЮДА СВОИ КЛЮЧИ ИЗ ШАГА 1
const vapidKeys = {
  publicKey: 'BHX3bIZ-0cN2e6JHITJDlZz7A5gBqLrT9Db34tGSkla1UH0-yJxtBmEFcT07L4S_hIKOUlm8C0V0xPWlzM47UDA',
  privateKey: 'Kk5bEY3_1SX4Z6eszQzGL2-WdT_qZC7a0Tdhqabtwm4'
};

// Настраиваем web-push с нашими ключами
webpush.setVapidDetails(
  'mailto:aragorn6549narlas@gmail.com', // Твой email
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.send('🎉 Push-сервер работает!');
});

// Маршрут для отправки push-уведомления
app.post('/send-push', async (req, res) => {
  try {
    const { subscription, message } = req.body;
    
    if (!subscription || !message) {
      return res.status(400).json({ error: 'Нет подписки или сообщения' });
    }
    
    console.log('📨 Отправляем уведомление:', message.title);
    
    // Отправляем push-уведомление
    await webpush.sendNotification(subscription, JSON.stringify(message));
    
    console.log('✅ Уведомление отправлено!');
    res.json({ success: true });
    
  } catch (error) {
    console.error('❌ Ошибка отправки:', error);
    res.status(500).json({ error: 'Ошибка отправки уведомления' });
  }
});

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
