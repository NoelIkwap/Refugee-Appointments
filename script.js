const appointmentData = {
    "H9B-25-6190192": "2025-11-17 00:00:00",
    "H9B-25-6115634": "2025-11-17 00:00:00",
    "H9B-25-6084816": "2025-11-17 00:00:00",
    "H9B-25-6082269": "2025-11-17 00:00:00",
    "H9B-25-6082259": "2025-11-17 00:00:00",
    "H9B-25-6077419": "2025-11-18 00:00:00",
    "H9B-25-6077351": "2025-11-18 00:00:00",
    "H9B-25-6074861": "2025-11-18 00:00:00",
    "H9B-25-6074844": "2025-11-18 00:00:00",
    "H9B-25-6069748": "2025-11-18 00:00:00",
    "H9B-25-6068162": "2025-11-18 00:00:00",
    "H9B-25-6067745": "2025-11-18 00:00:00",
    "H9B-25-6067530": "2025-11-18 00:00:00",
    "H9B-25-5968545": "2025-11-18 00:00:00",
    "H9B-25-5967796": "2025-11-18 00:00:00"
};

// Additional appointment details (you can expand this)
const appointmentDetails = {
    "H9B-25-6190192": { location: "Main Office - Room 101", type: "Registration", duration: "60 minutes" },
    "H9B-25-6115634": { location: "North Wing - Room 205", type: "Documentation", duration: "45 minutes" },
    "H9B-25-6084816": { location: "Main Office - Room 102", type: "Verification", duration: "30 minutes" }
};

function lookupAppointment() {
    const regId = document.getElementById('registrationId').value.trim().toUpperCase();
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const searchBtn = document.getElementById('searchBtn');

    // Hide previous results, show loading
    resultDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
    searchBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        loadingDiv.style.display = 'none';
        
        if (!regId) {
            showResult('Please enter a Registration Group ID', 'error', 'Missing Information');
            searchBtn.disabled = false;
            return;
        }

        if (appointmentData[regId]) {
            const appointmentDate = new Date(appointmentData[regId]);
            const details = appointmentDetails[regId] || { 
                location: "Main Office - To be assigned", 
                type: "Standard Appointment", 
                duration: "60 minutes" 
            };

            const formattedDate = appointmentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            showResult(`
                <h3><i class="fas fa-check-circle"></i> Appointment Found!</h3>
                <p>Your appointment has been scheduled. Here are your details:</p>
                <div class="result-details">
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-id-card"></i> Registration ID:</span>
                        <span class="detail-value">${regId}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-calendar-day"></i> Appointment Date:</span>
                        <span class="detail-value">${formattedDate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-clock"></i> Time:</span>
                        <span class="detail-value">${formattedTime}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-map-marker-alt"></i> Location:</span>
                        <span class="detail-value">${details.location}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-tasks"></i> Appointment Type:</span>
                        <span class="detail-value">${details.type}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-hourglass-half"></i> Duration:</span>
                        <span class="detail-value">${details.duration}</span>
                    </div>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.5); border-radius: 8px;">
                    <p><strong><i class="fas fa-info-circle"></i> Important Notes:</strong></p>
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li>Please arrive 15 minutes before your scheduled time</li>
                        <li>Bring all required documents with you</li>
                        <li>Contact support if you need to reschedule</li>
                    </ul>
                </div>
            `, 'success');
        } else {
            showResult(`
                <h3><i class="fas fa-exclamation-triangle"></i> Appointment Not Found</h3>
                <p>No appointment found for Registration ID: <strong>${regId}</strong></p>
                <div style="margin-top: 15px;">
                    <p>Please check that you've entered your Registration Group ID correctly.</p>
                    <p>If you believe this is an error, please contact our support team.</p>
                </div>
            `, 'error');
        }
        
        searchBtn.disabled = false;
    }, 1500); // Simulate 1.5 second loading
}

function showResult(message, type, customTitle = '') {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = `result ${type}`;
    resultDiv.style.display = 'block';

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add event listener for Enter key
document.getElementById('registrationId').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        lookupAppointment();
    }
});

// Add input validation
document.getElementById('registrationId').addEventListener('input', function(e) {
    // Convert to uppercase automatically
    e.target.value = e.target.value.toUpperCase();
    
    // Basic format validation (optional)
    const isValidFormat = /^[A-Z0-9-]+$/.test(e.target.value);
    if (!isValidFormat && e.target.value.length > 0) {
        e.target.style.borderColor = '#dc3545';
    } else {
        e.target.style.borderColor = '';
    }
});
