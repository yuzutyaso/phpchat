document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const messageInput = document.getElementById('message-input');

    // WebSocketサーバーへの接続
    const ws = new WebSocket('https://phpchat-gilt.vercel.app/'); // サーバーのアドレスに合わせて変更

    ws.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    ws.onmessage = event => {
        const data = JSON.parse(event.data);
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // スクロールを一番下へ
    };

    ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    chatForm.addEventListener('submit', event => {
        event.preventDefault();
        
        const user = userInput.value || 'ゲスト';
        const message = messageInput.value;
        
        if (message) {
            ws.send(JSON.stringify({ user, message }));
            messageInput.value = ''; // 入力欄をクリア
        }
    });
});
