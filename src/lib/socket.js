// Бул файл "почтальон" сыяктуу иштейт. 
// Ал жөн гана WebSocket туташуусун башкарып, келген маалыматтарды "кыйкырып" турат.

let socket = null;

const connect = () => {
    // --- Render.com'до жайгаштырылган backend'дин дарегин колдонобуз ---
    const backendHost = 'zamanbap-cafe-backend.onrender.com';
    const socketUrl = `wss://${backendHost}`; // Render HTTPS колдонот жана стандарттык портту колдонот
    
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
        console.log('WebSocket-серверге туташты.');
        // Туташкандан кийин менюнун толук абалын суроо
        sendMessage({ type: 'get_menu' });
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log('Серверден маалымат келди:', data);
            
            // Маалыматты Zustang'га түз кошпой, global "event" катары таратабыз.
            // App.jsx бул event'ти угуп, тиешелүү store'ду жаңылайт.
            window.dispatchEvent(new CustomEvent('socket-message', { detail: data }));

        } catch (error) {
            console.error('Серверден келген маалыматты окууда ката:', error);
        }
    };

    socket.onclose = () => {
        console.log('WebSocket байланышы үзүлдү. 5 секунддан кийин кайра туташам...');
        setTimeout(connect, 5000);
    };

    socket.onerror = (error) => {
        console.error('WebSocket катасы:', error);
        socket.close();
    };
};

const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket туташкан эмес. Маалымат жөнөтүлгөн жок.');
    }
};

// Тиркеме биринчи жолу жүктөлгөндө туташууну баштоо
connect();

export { sendMessage };