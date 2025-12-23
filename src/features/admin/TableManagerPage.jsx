import React, { useState, useRef } from 'react';
import { useMenuStore } from '../../store/menuStore';
import { useReactToPrint } from 'react-to-print';
import { QRCodeSVG } from 'qrcode.react';

// QR Code Component to be printed
const QrCodeToPrint = React.forwardRef(({ table }, ref) => {
    // Always use the current host for the QR code URL
    const baseUrl = window.location.origin;
    const tableUrl = `${baseUrl}/?table=${table.number}`;

    return (
        <div ref={ref} className="p-10 text-center">
            <h2 className="text-4xl font-bold mb-4">Үстөл №{table.number}</h2>
            <QRCodeSVG value={tableUrl} size={400} level="H" className="w-96 h-96 mx-auto" bgColor="#FFFFFF" fgColor="#4A2C2A" includeMargin={true} />
            <p className="mt-4 text-lg">Менюну көрүү үчүн QR-кодду сканерлеңиз</p>
        </div>
    );
});


function TableManagerPage() {
    const { tables, addTable, deleteTable } = useMenuStore(); // Import deleteTable
    const [tableNumber, setTableNumber] = useState('');
    const [isEditing, setIsEditing] = useState(false); // New state for editing mode
    
    const componentToPrintRef = useRef();
    const [selectedTableForPrint, setSelectedTableForPrint] = useState(null);

    const handlePrint = useReactToPrint({
        content: () => componentToPrintRef.current,
    });

    const triggerPrint = (table) => {
        setSelectedTableForPrint(table);
        // Timeout to allow state to update before printing
        setTimeout(() => {
            handlePrint();
        }, 100);
    };

    const handleAddTable = (e) => {
        e.preventDefault();
        if (tableNumber && !tables.find(t => t.number === tableNumber)) {
            addTable(tableNumber);
            setTableNumber('');
        } else {
            alert("Бул номердеги үстөл мурунтан эле бар же номер туура эмес.");
        }
    };

    const handleDeleteTable = (tableId) => {
        if (window.confirm("Чын эле бул үстөлдү өчүргүңүз келеби?")) {
            deleteTable(tableId);
        }
    };

    const getTableQrUrl = (number) => {
        const baseUrl = window.location.origin;
        return `${baseUrl}/?table=${number}`;
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Үстөлдөрдү башкаруу</h1>

            {/* Add Table Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">Жаңы үстөл кошуу</h2>
                <form onSubmit={handleAddTable} className="flex items-center space-x-4">
                    <input 
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Үстөлдүн номерин киргизиңиз (мис., 5 же VIP-1)"
                        className="p-2 border rounded-lg w-full"
                        required
                    />
                    <button 
                        type="submit" 
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                    >
                        Кошуу
                    </button>
                </form>
            </div>

            {/* Tables List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4"> {/* Moved button here */}
                    <h2 className="text-xl font-bold">Кафедеги үстөлдөр ({tables.length})</h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-4 py-2 font-semibold rounded-lg ${isEditing ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    >
                        {isEditing ? 'Бүттү' : 'Оңдоо'}
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tables.map(table => (
                        <div key={table.id} className="p-4 border rounded-lg text-center shadow relative"> {/* Added relative for delete button positioning */}
                            {isEditing && (
                                <button
                                    onClick={() => handleDeleteTable(table.id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 leading-none text-sm"
                                    aria-label="Delete table"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                            <h3 className="text-2xl font-bold mb-2">Үстөл №{table.number}</h3>
                            <div className="flex justify-center my-4">
                                <QRCodeSVG value={getTableQrUrl(table.number)} size={150} level="L" />
                            </div>
                            <button
                                onClick={() => triggerPrint(table)}
                                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                            >
                                Басып чыгаруу
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hidden component for printing */}
            <div style={{ display: "none" }}>
                {selectedTableForPrint && <QrCodeToPrint ref={componentToPrintRef} table={selectedTableForPrint} />}
            </div>
        </div>
    );
}

export default TableManagerPage;