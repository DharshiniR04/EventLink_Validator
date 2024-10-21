import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './Scanner.css';
import axios from 'axios';

function Scanner() {
    const [detail, setDetail] = useState({});
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 400,
                height: 400,
            },
            fps: 5,
        });

        scanner.render(onScanSuccess, onScanFailure);
        return () => {
            scanner.clear();
        };
    }, []);

    const checkValid = async (decodedQR) => {
        try {
            const response = await axios.get(`http://localhost:5200/api/validate/getqr?qr=${decodedQR}`);
            setDetail(response.data.eventdetail);
            setShowModal(true); 
        } catch (err) {
            console.log(err);
        }
    }

    const onScanSuccess = async (decodedText, decodedResult) => {
        await checkValid(decodedText);
    };

    const onScanFailure = (error) => {
        console.warn(`QR code scan error: ${error}`);
    };

    const closeModal = () => {
        setShowModal(false); 
    }

    return (
        <div>
            <h2 className='qrscanner-heading'>QR Code Scanner</h2>
            <div id="reader" style={{ width: '400px', height: '400px' }}></div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h3>User & Event Details</h3>

                        <p><strong>Name:</strong> {detail?.name}</p>
                        <p><strong>Email:</strong> {detail?.email}</p>
                        <p><strong>College:</strong> {detail?.college}</p>
                        <p><strong>Department:</strong> {detail?.registereddepartment}</p>
                        <p><strong>Payment Status:</strong> {detail?.paymentstatus}</p>

                        {detail?.events && detail?.events.map((event, index) => (
                            <div key={index} className="event-detail">
                                <h4>Event {index + 1}:</h4>
                                <p><strong>Event Name:</strong> {event.eventname}</p>
                                <p><strong>Category:</strong> {event.category}</p>
                                <p><strong>Location:</strong> {event.eventlocation}</p>
                                <p><strong>Department:</strong> {event.eventdepartment}</p>
                                <p><strong>Time:</strong> {event.eventtime}</p>
                                <p><strong>Date:</strong> {new Date(event.eventdate).toLocaleDateString()}</p>
                                <p><strong>Team Size:</strong> {event.eventteamsize}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Scanner;
