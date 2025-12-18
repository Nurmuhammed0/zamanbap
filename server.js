// Бул жөнөкөй WebSocket-сервер.
// Ал буйрутмаларды жана менюну эсинде сактап, бардык туташкан түзмөктөргө (кардар, админ) таратып турат.

import { WebSocketServer } from 'ws';
import http from 'http';
import os from 'os';

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT, host: '0.0.0.0' });

// --- Маалыматтар базасы (in-memory) ---
let orders = [];

// Меню эми localStorage'да эмес, ушул жерде, сервердин эсинде сакталат.
let menu = {
  categories: [
    { id: 'cat-chailar', name: 'Чайлар' },
    { id: 'cat-kofe', name: 'Кофе' },
    { id: 'cat-suusunuktar', name: 'Суусундуктар' },
    { id: 'cat-ysyk-tamaktar', name: 'Ысык Тамактар' },
    { id: 'cat-fastfood', name: 'Фастфуд' },
    { id: 'cat-shorpolor', name: 'Шорполор' },
    { id: 'cat-salattar', name: 'Салаттар' },
    { id: 'cat-garnirler', name: 'Гарнирлер' },
    { id: 'cat-dessertter', name: 'Десерттер' },
    { id: 'cat-soustаr', name: 'Соустар' },
    { id: 'cat-uluttuk-tamaktar', name: 'Улуттук тамактар' },
    { id: 'cat-kombo', name: 'Комбо' },
  ],
  items: [
    {
      id: 'item-1',
      categoryId: 'cat-kofe',
      name: 'Латте',
      description: 'Классикалык эспрессо бууланган сүт менен',
      price: 250,
      imageUrl: 'https://www.torrefacto.ru/upload/uf/d00/mdoibknztzibkoforsrbpa93ijzbhw9f.jpg',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-2',
      categoryId: 'cat-kofe',
      name: 'Капучино',
      description: 'Көп көбүгү бар эспрессо',
      price: 240,
      imageUrl: 'https://images.unsplash.com/photo-1557772611-722dabe20327?q=80&w=2592&auto=format&fit=crop',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-3',
      categoryId: 'cat-dessertter', 
      name: 'Классикалык круассан',
      description: 'Майлуу камырдан жасалган даамдуу круассан',
      price: 180,
      imageUrl: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?q=80&w=2592&auto=format&fit=crop',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-4',
      categoryId: 'cat-uluttuk-tamaktar',
      name: 'Бешбармак',
      description: 'Майда тууралган эт, камыр жана пияз кошулган улуттук тамак',
      price: 450,
      imageUrl: 'https://s0.rbk.ru/v6_top_pics/media/img/4/32/347612607965324.webp',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-5',
      categoryId: 'cat-uluttuk-tamaktar',
      name: 'Плов',
      description: 'Күрүч, сабиз жана эт менен демделип бышырылган палоо',
      price: 380,
      imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=2592&auto=format&fit=crop',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-6',
      categoryId: 'cat-ysyk-tamaktar',
      name: 'Стейк',
      description: 'Грильде бышырылган ширелүү эт',
      price: 850,
      imageUrl: 'https://halal-spb.ru/sites/default/files/styles/large/public/bd09da8cd90c4f5f8807f24785545d00.jpg?itok=KnyHC-n8',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-7',
      categoryId: 'cat-fastfood',
      name: 'Бургер',
      description: 'Классикалык уй этинен жасалган котлет, жашылчалар жана булочка',
      price: 320,
      imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2592&auto=format&fit=crop',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-8',
      categoryId: 'cat-shorpolor',
      name: 'Чечевица шорпосу',
      description: 'Жашылчалар кошулуп, жасмыктан жасалган коюу шорпо',
      price: 220,
      imageUrl: 'https://vkusnoff.com/img/recepty/5972/big.webp',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-9',
      categoryId: 'cat-salattar',
      name: 'Цезарь салаты',
      description: 'Тоок эти, нан жана атайын соус менен даярдалган салат',
      price: 350,
      imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2592&auto=format&fit=crop',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-10',
      categoryId: 'cat-fastfood',
      name: 'Пицца "Маргарита"',
      description: 'Помидор, моцарелла сыры жана райхан менен классикалык пицца',
      price: 550,
      imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=2592&auto=format&fit=crop',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-11',
      categoryId: 'cat-ysyk-tamaktar',
      name: 'Лагман',
      description: 'Чоюлган камыр, эт жана жашылчалардан жасалган тамак',
      price: 390,
      imageUrl: 'https://i.obozrevatel.com/food/recipemain/2020/2/19/lagman.jpg?size=636x424',
      isAvailable: true,
      options: [],
    },
    {
      id: 'item-12',
      categoryId: 'cat-salattar',
      name: 'Грек салаты',
      description: 'Сыр, помидор, бадыраң жана зайтун менен жасалган жеңил салат',
      price: 280,
      imageUrl: 'https://static.1000.menu/img/content-v2/9a/aa/1980/salat-grecheskii-s-kuricei-klassicheskii_1648792206_11_max.jpg',
      isAvailable: true,
      options: [],
    }
  ],
};


console.log(`WebSocket-сервер ${PORT}-портто иштеп баштады...`);

// --- Жардамчы функциялар ---

// Бардык туташкан клиенттерге маалымат жөнөтүү функциясы
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN = 1
      client.send(JSON.stringify(data));
    }
  });
};

// --- WebSocket негизги логикасы ---

wss.on('connection', (ws) => {
  console.log('Жаңы клиент туташты.');

  // Жаңы туташкан клиентке дароо эле учурдагы бардык маалыматтарды жөнөтөбүз.
  ws.send(JSON.stringify({ type: 'initial_orders', payload: orders }));
  ws.send(JSON.stringify({ type: 'initial_menu', payload: menu }));

  // Клиенттен маалымат келгенде...
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Кабыл алынган маалымат:', data);

      // --- Буйрутмаларды башкаруу ---
      switch (data.type) {
        case 'new_order': {
          const newOrder = {
              ...data.payload,
              orderId: `order-${Date.now()}`, // 'orderId' for client consistency
              timestamp: new Date().toISOString(),
              status: 'New',
          };
          orders.push(newOrder);
          // Буйрутма берген клиентке гана ийгиликтүү түзүлгөнүн билдиребиз
          ws.send(JSON.stringify({ type: 'order_created', payload: newOrder }));
          // Бардык башка клиенттерге (админдерге) жаңы буйрутма келгенин билдиребиз
          broadcast({ type: 'new_order_received', payload: newOrder });
          break;
        }
        case 'update_status': {
          orders = orders.map(order => 
              order.orderId === data.payload.orderId 
                  ? { ...order, status: data.payload.newStatus } 
                  : order
          );
          broadcast({ type: 'orders_updated', payload: orders });
          break;
        }
        case 'archive_paid_orders': { // Renamed and repurposed
          orders = orders.filter(order => order.status !== 'Paid');
          broadcast({ type: 'orders_updated', payload: orders });
          break;
        }

        // --- Менюну башкаруу ---
        case 'toggle_item_availability': {
            menu.items = menu.items.map(item => 
                item.id === data.payload.itemId 
                    ? { ...item, isAvailable: !item.isAvailable } 
                    : item
            );
            broadcast({ type: 'menu_updated', payload: menu });
            break;
        }
        case 'add_item': {
            const newItem = { id: `item-${Date.now()}`, ...data.payload.itemData }
            menu.items.push(newItem);
            broadcast({ type: 'menu_updated', payload: menu });
            break;
        }
        case 'update_item': {
            menu.items = menu.items.map(item => 
                item.id === data.payload.itemId 
                    ? { ...item, ...data.payload.itemData } 
                    : item
            );
            broadcast({ type: 'menu_updated', payload: menu });
            break;
        }
        case 'delete_item': {
            menu.items = menu.items.filter(item => item.id !== data.payload.itemId);
            broadcast({ type: 'menu_updated', payload: menu });
            break;
        }

        // --- Кассаны башкаруу ---
        case 'mark_as_paid': { // Changed from delete to update
          orders = orders.map(order => 
              order.orderId === data.payload.orderId 
                  ? { ...order, status: 'Paid' } 
                  : order
          );
          broadcast({ type: 'orders_updated', payload: orders });
          break;
        }
        case 'delete_order': {
          orders = orders.filter(order => order.orderId !== data.payload.orderId);
          broadcast({ type: 'orders_updated', payload: orders });
          break;
        }
      }

    } catch (error) {
      console.error('Маалыматты иштетүүдө ката кетти:', error);
    }
  });

  ws.on('close', () => {
    console.log('Клиент ажыратылды.');
  });
});

// --- HTTP Server for IP address ---
const httpServer = http.createServer((req, res) => {
    if (req.url === '/api/get-ip' && req.method === 'GET') {
        const nets = os.networkInterfaces();
        const results = {};

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    results[name].push(net.address);
                }
            }
        }
        
        // Find the primary IP address (often on Wi-Fi or Ethernet)
        let primaryIp = '';
        const wifiInterface = Object.keys(results).find(name => name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wireless'));
        const ethernetInterface = Object.keys(results).find(name => name.toLowerCase().includes('ethernet'));

        if (wifiInterface && results[wifiInterface]) {
            primaryIp = results[wifiInterface][0];
        } else if (ethernetInterface && results[ethernetInterface]) {
            primaryIp = results[ethernetInterface][0];
        } else {
            // Fallback to the first available IP
            const firstInterface = Object.keys(results)[0];
            if (firstInterface && results[firstInterface]) {
                primaryIp = results[firstInterface][0];
            }
        }

        res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // Allow requests from Vite dev server
        });
        res.end(JSON.stringify({ ip: primaryIp }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

httpServer.listen(8081, '0.0.0.0', () => {
    console.log('HTTP server for IP lookup listening on port 8081...');
});