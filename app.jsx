const { useState, useEffect, useRef, useCallback } = React;

// ===================== Icon Components =====================

const Icons = {
    Logo: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="10" height="10" stroke="#00d9ff" strokeWidth="2" rx="2"/>
            <rect x="18" y="4" width="10" height="10" stroke="#a855f7" strokeWidth="2" rx="2"/>
            <rect x="4" y="18" width="10" height="10" stroke="#a855f7" strokeWidth="2" rx="2"/>
            <rect x="18" y="18" width="10" height="10" stroke="#00d9ff" strokeWidth="2" rx="2"/>
            <circle cx="9" cy="9" r="2" fill="#00d9ff"/>
            <circle cx="23" cy="23" r="2" fill="#a855f7"/>
        </svg>
    ),
    Shield: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
    ),
    Zap: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
    ),
    Camera: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
        </svg>
    ),
    Upload: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
    ),
    History: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>
    ),
    Settings: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m6.08 0l4.24-4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-6.08 0l-4.24 4.24"/>
        </svg>
    ),
    Home: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    ),
    CheckCircle: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
    ),
    AlertCircle: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
    ),
    XCircle: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
    ),
    Menu: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
    ),
    Close: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    ),
    Moon: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    ),
    Sun: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
    ),
    Search: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
        </svg>
    ),
    Filter: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
    ),
    Download: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
    ),
    Trash: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
    ),
    Star: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 10.26 23.77 11.64 17.88 17.51 19.54 26.43 12 22.77 4.46 26.43 6.12 17.51 0.23 11.64 8.91 10.26 12 2"/>
        </svg>
    ),
    ChevronDown: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
        </svg>
    ),
    Code: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
        </svg>
    ),
};

// ===================== Navigation Bar =====================

const Navbar = ({ currentPage, setCurrentPage, isDarkMode, setIsDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Home', value: 'home', icon: Icons.Home },
        { label: 'Scan', value: 'scan', icon: Icons.Camera },
        { label: 'History', value: 'history', icon: Icons.History },
        { label: 'About', value: 'about', icon: Icons.Code },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-b from-[rgba(5,8,22,0.95)] to-transparent backdrop-blur-lg border-b border-[rgba(255,255,255,0.1)]' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer hover-scale" onClick={() => setCurrentPage('home')}>
                        <div className="p-2 bg-gradient-to-br from-[#a855f7] to-[#00d9ff] rounded-lg">
                            <Icons.Shield />
                        </div>
                        <span className="hidden sm:block font-display font-bold text-lg gradient-text">QRShield AI</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map(item => (
                            <button
                                key={item.value}
                                onClick={() => setCurrentPage(item.value)}
                                className={`flex items-center gap-2 text-sm font-medium transition-all ${currentPage === item.value ? 'text-[#00d9ff]' : 'text-gray-400 hover:text-white'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-all"
                            title="Toggle theme"
                        >
                            {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg"
                        >
                            {isOpen ? <Icons.Close /> : <Icons.Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2 animate-slideInDown">
                        {navItems.map(item => (
                            <button
                                key={item.value}
                                onClick={() => {
                                    setCurrentPage(item.value);
                                    setIsOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-2 rounded-lg transition-all ${currentPage === item.value ? 'bg-[rgba(168,85,247,0.2)] text-[#00d9ff]' : 'text-gray-400 hover:text-white'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

// ===================== Hero Section =====================

const HeroSection = ({ setCurrentPage }) => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full opacity-10 blur-3xl animate-float"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-[#00d9ff] to-[#3b82f6] rounded-full opacity-10 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Animated title */}
                <div className="mb-6 inline-block">
                    <div className="px-4 py-2 bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.3)] rounded-full text-[#a855f7] text-sm font-semibold">
                        🔐 Enterprise-Grade Security
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-slideInDown">
                    AI-Powered QR Quishing Detection
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto animate-slideInUp" style={{animationDelay: '0.2s'}}>
                    Protect yourself from malicious QR codes with advanced AI detection. Real-time scanning, intelligent analysis, and comprehensive threat assessment.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
                    <button
                        onClick={() => setCurrentPage('scan')}
                        className="btn btn-primary text-lg px-8 py-4 hover-lift"
                    >
                        <Icons.Zap />
                        Start Scanning
                    </button>
                    <button
                        onClick={() => setCurrentPage('about')}
                        className="btn btn-secondary text-lg px-8 py-4 hover-lift"
                    >
                        Learn More
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-8 mt-20 animate-fadeIn" style={{animationDelay: '0.6s'}}>
                    <div className="text-center">
                        <div className="text-3xl font-display font-bold gradient-text">99.8%</div>
                        <p className="text-gray-500 text-sm mt-2">Detection Accuracy</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-display font-bold gradient-text">Real-Time</div>
                        <p className="text-gray-500 text-sm mt-2">Instant Analysis</p>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-display font-bold gradient-text">Open Source</div>
                        <p className="text-gray-500 text-sm mt-2">Fully Transparent</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ===================== Scan Page =====================

const ScanPage = () => {
    const [scanMode, setScanMode] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Webcam Scanner
    const startWebcamScanner = async () => {
        try {
            setError(null);
            setCameraActive(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                startScanDetection();
            }
        } catch (err) {
            setError('Camera access denied. Please allow camera permissions.');
            setCameraActive(false);
            showNotification('Camera access denied', 'error');
        }
    };

    const startScanDetection = async () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext('2d');

        const detectQR = async () => {
            if (!cameraActive || !video || video.readyState !== video.HAVE_ENOUGH_DATA) {
                requestAnimationFrame(detectQR);
                return;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const imageBase64 = canvas.toDataURL('image/jpeg').split(',')[1];

            try {
                setLoading(true);
                const response = await fetch('/api/detect/webcam', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ frame: `data:image/jpeg;base64,${imageBase64}` })
                });

                const data = await response.json();
                if (data.success) {
                    setResult(data);
                    setCameraActive(false);
                    stopWebcamScanner();
                    showNotification('QR code detected!', 'success');
                    setLoading(false);
                }
            } catch (err) {
                console.error('Detection error:', err);
            }

            setLoading(false);
            requestAnimationFrame(detectQR);
        };

        detectQR();
    };

    const stopWebcamScanner = () => {
        setCameraActive(false);
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    };

    // Image Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/detect/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setResult(data);
                showNotification('QR code detected!', 'success');
            } else {
                setError(data.message || 'Could not detect QR code in image');
                showNotification(data.message || 'No QR detected', 'error');
            }
        } catch (err) {
            setError('Upload failed. Please try again.');
            showNotification('Upload failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return <ResultPage result={result} onReset={() => { setResult(null); setScanMode(null); }} />;
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            {notification && (
                <div className={`toast toast-${notification.type} fixed bottom-8 right-8`}>
                    {notification.message}
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4">
                {!scanMode ? (
                    <>
                        <h1 className="text-4xl font-display font-bold mb-4 text-center">Scan QR Code</h1>
                        <p className="text-gray-400 text-center mb-12">Choose your scanning method</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Webcam Option */}
                            <div
                                onClick={() => setScanMode('webcam')}
                                className="glass-card cursor-pointer hover-lift group"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-xl mb-4 group-hover:shadow-lg group-hover:shadow-[#a855f7]/50">
                                    <Icons.Camera />
                                </div>
                                <h3 className="text-xl font-display font-bold mb-2">Live Camera Scanner</h3>
                                <p className="text-gray-400 mb-4">Real-time QR detection from your device camera</p>
                                <div className="flex items-center gap-2 text-[#00d9ff] font-semibold">
                                    Start Scanning <Icons.ChevronDown className="rotate-[-90deg]" />
                                </div>
                            </div>

                            {/* Upload Option */}
                            <div
                                onClick={() => setScanMode('upload')}
                                className="glass-card cursor-pointer hover-lift group"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00d9ff] to-[#3b82f6] rounded-xl mb-4 group-hover:shadow-lg group-hover:shadow-[#00d9ff]/50">
                                    <Icons.Upload />
                                </div>
                                <h3 className="text-xl font-display font-bold mb-2">Upload Image</h3>
                                <p className="text-gray-400 mb-4">Analyze QR codes from image files</p>
                                <div className="flex items-center gap-2 text-[#00d9ff] font-semibold">
                                    Upload File <Icons.ChevronDown className="rotate-[-90deg]" />
                                </div>
                            </div>
                        </div>
                    </>
                ) : scanMode === 'webcam' ? (
                    <>
                        <button
                            onClick={() => setScanMode(null)}
                            className="mb-6 px-4 py-2 bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.3)] rounded-lg text-[#a855f7] hover:bg-[rgba(168,85,247,0.2)]"
                        >
                            ← Back
                        </button>

                        <div className="glass-card">
                            <h2 className="text-2xl font-display font-bold mb-6">Live QR Scanner</h2>

                            {!cameraActive ? (
                                <button
                                    onClick={startWebcamScanner}
                                    className="btn btn-primary w-full mb-4"
                                >
                                    <Icons.Camera /> Allow Camera & Start Scanning
                                </button>
                            ) : (
                                <>
                                    <div className="relative bg-black rounded-lg overflow-hidden mb-6 aspect-video border-2 border-[#00d9ff]">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className="w-full h-full object-cover"
                                        />
                                        <canvas ref={canvasRef} style={{display: 'none'}} />

                                        {/* Scan Frame */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-64 h-64 border-2 border-[#00d9ff] rounded-lg"></div>
                                        </div>

                                        {/* Scanning Line */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent animate-scanLine"></div>

                                        {loading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
                                                <div className="spinner"></div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={stopWebcamScanner}
                                        className="btn btn-secondary w-full"
                                    >
                                        Stop Scanning
                                    </button>
                                </>
                            )}

                            {error && (
                                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                                    {error}
                                </div>
                            )}
                        </div>
                    </>
                ) : scanMode === 'upload' ? (
                    <>
                        <button
                            onClick={() => setScanMode(null)}
                            className="mb-6 px-4 py-2 bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.3)] rounded-lg text-[#a855f7] hover:bg-[rgba(168,85,247,0.2)]"
                        >
                            ← Back
                        </button>

                        <div className="glass-card">
                            <h2 className="text-2xl font-display font-bold mb-6">Upload QR Image</h2>

                            <div className="border-2 border-dashed border-[#00d9ff] rounded-lg p-12 text-center hover:border-[#a855f7] transition-all cursor-pointer group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="file-input"
                                    disabled={loading}
                                />
                                <label htmlFor="file-input" className="cursor-pointer">
                                    <Icons.Upload className="w-12 h-12 mx-auto mb-4 text-[#00d9ff] group-hover:text-[#a855f7]" />
                                    <p className="text-lg font-semibold mb-2">Drag and drop your image</p>
                                    <p className="text-gray-400">or click to browse (PNG, JPG, JPEG)</p>
                                </label>
                            </div>

                            {error && (
                                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                                    {error}
                                </div>
                            )}

                            {loading && (
                                <div className="mt-6 flex items-center justify-center gap-3">
                                    <div className="spinner"></div>
                                    <span>Analyzing image...</span>
                                </div>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

// ===================== Result Page =====================

const ResultPage = ({ result, onReset }) => {
    const isSafe = result.threat_level === 'Low';
    const colors = {
        Low: { badge: 'badge-safe', icon: Icons.CheckCircle, color: '#22c55e' },
        Medium: { badge: 'badge-medium', icon: Icons.AlertCircle, color: '#fb923c' },
        High: { badge: 'badge-suspicious', icon: Icons.XCircle, color: '#ef4444' }
    };

    const ColorIcon = colors[result.threat_level].icon;

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Result Summary */}
                <div className="glass-card mb-8 animate-scaleIn">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center justify-center w-24 h-24 rounded-full" style={{background: `linear-gradient(135deg, ${colors[result.threat_level].color}, transparent)`}}>
                            <ColorIcon style={{color: colors[result.threat_level].color}} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl font-display font-bold mb-2">
                                {isSafe ? '✓ Safe' : '⚠ Suspicious'}
                            </h1>
                            <div className={`badge ${colors[result.threat_level].badge}`}>
                                {result.threat_level} Risk
                            </div>
                        </div>
                    </div>

                    {/* Risk Score */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-display font-bold gradient-text mb-2">{result.risk_score}%</div>
                            <p className="text-gray-400">Risk Score</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-semibold mb-2">{result.threat_level}</div>
                            <p className="text-gray-400">Threat Level</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-semibold mb-2">{result.scan_source}</div>
                            <p className="text-gray-400">Scan Source</p>
                        </div>
                    </div>
                </div>

                {/* QR Content */}
                <div className="glass-card mb-8 animate-slideInUp">
                    <h2 className="text-xl font-display font-bold mb-4">QR Content</h2>
                    <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4 font-mono text-sm text-gray-300 break-all border border-[rgba(255,255,255,0.1)]">
                        {result.qr_content}
                    </div>
                </div>

                {/* Analysis Reasons */}
                <div className="glass-card mb-8 animate-slideInUp" style={{animationDelay: '0.1s'}}>
                    <h2 className="text-xl font-display font-bold mb-4">Security Analysis</h2>
                    <div className="space-y-3">
                        {result.reasons.map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
                                <span className="text-[#00d9ff] font-bold mt-1">•</span>
                                <span className="text-gray-300">{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 animate-slideInUp" style={{animationDelay: '0.2s'}}>
                    <button
                        onClick={onReset}
                        className="btn btn-primary flex-1"
                    >
                        <Icons.Camera /> Scan Another QR
                    </button>
                </div>
            </div>
        </div>
    );
};

// ===================== History Page =====================

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [threatFilter, setThreatFilter] = useState('all');
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        filterHistory();
    }, [history, searchTerm, threatFilter]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/history');
            const data = await response.json();
            if (data.success) {
                setHistory(data.history);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            showNotification('Failed to load history', 'error');
        } finally {
            setLoading(false);
        }
    };

    const filterHistory = () => {
        let filtered = history.filter(item => {
            const matchesSearch = !searchTerm || 
                item.qr_content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.url?.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFilter = threatFilter === 'all' || item.threat_level === threatFilter;
            
            return matchesSearch && matchesFilter;
        });

        setFilteredHistory(filtered);
    };

    const deleteRecord = async (id) => {
        try {
            const response = await fetch(`/api/history/${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                setHistory(history.filter(item => item.id !== id));
                showNotification('Record deleted', 'success');
            }
        } catch (err) {
            showNotification('Delete failed', 'error');
        }
    };

    const clearAllHistory = async () => {
        if (confirm('Are you sure? This cannot be undone.')) {
            try {
                const response = await fetch('/api/history/clear', { method: 'DELETE' });
                const data = await response.json();
                if (data.success) {
                    setHistory([]);
                    showNotification('All history cleared', 'success');
                }
            } catch (err) {
                showNotification('Clear failed', 'error');
            }
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            {notification && (
                <div className={`toast toast-${notification.type} fixed bottom-8 right-8`}>
                    {notification.message}
                </div>
            )}

            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl font-display font-bold mb-2">Scan History</h1>
                <p className="text-gray-400 mb-8">View and manage your previous QR code scans</p>

                {/* Controls */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Icons.Search className="absolute left-4 top-3 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by URL or content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 w-full"
                            />
                        </div>
                    </div>
                    <select
                        value={threatFilter}
                        onChange={(e) => setThreatFilter(e.target.value)}
                        className="w-full"
                    >
                        <option value="all">All Threat Levels</option>
                        <option value="Low">Safe (Low)</option>
                        <option value="Medium">Medium Risk</option>
                        <option value="High">Suspicious (High)</option>
                    </select>
                </div>

                {/* History Table */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="spinner"></div>
                    </div>
                ) : filteredHistory.length === 0 ? (
                    <div className="glass-card text-center py-12">
                        <Icons.History className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                        <p className="text-gray-400 text-lg">No scans found</p>
                        <p className="text-gray-500 text-sm">Start scanning QR codes to see them here</p>
                    </div>
                ) : (
                    <>
                        <div className="glass-card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-[rgba(255,255,255,0.1)]">
                                        <tr>
                                            <th className="text-left p-4 font-semibold text-gray-400">Content</th>
                                            <th className="text-left p-4 font-semibold text-gray-400">Threat Level</th>
                                            <th className="text-left p-4 font-semibold text-gray-400">Risk Score</th>
                                            <th className="text-left p-4 font-semibold text-gray-400">Source</th>
                                            <th className="text-left p-4 font-semibold text-gray-400">Time</th>
                                            <th className="text-left p-4 font-semibold text-gray-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredHistory.map((item) => {
                                            const threatColors = {
                                                'Low': 'text-green-400',
                                                'Medium': 'text-yellow-400',
                                                'High': 'text-red-400'
                                            };
                                            return (
                                                <tr key={item.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] transition-all">
                                                    <td className="p-4 font-mono text-xs text-gray-300 max-w-xs truncate">{item.qr_content}</td>
                                                    <td className="p-4">
                                                        <span className={`${threatColors[item.threat_level]} font-semibold`}>
                                                            {item.threat_level}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">{item.risk_score}%</td>
                                                    <td className="p-4 text-xs text-gray-400 capitalize">{item.scan_source}</td>
                                                    <td className="p-4 text-xs text-gray-400">{new Date(item.timestamp).toLocaleDateString()}</td>
                                                    <td className="p-4">
                                                        <button
                                                            onClick={() => deleteRecord(item.id)}
                                                            className="text-red-400 hover:text-red-300 transition-all"
                                                        >
                                                            <Icons.Trash className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {history.length > 0 && (
                            <button
                                onClick={clearAllHistory}
                                className="mt-6 px-6 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                            >
                                Clear All History
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

// ===================== About Page =====================

const AboutPage = () => {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-12">
                    <h1 className="text-5xl font-display font-bold mb-6">About QRShield AI</h1>
                    <p className="text-xl text-gray-400 leading-relaxed mb-8">
                        QRShield AI is an advanced cybersecurity solution designed to protect users from malicious QR codes. 
                        Leveraging machine learning and comprehensive URL analysis, it provides real-time detection of 
                        phishing attempts and quishing attacks.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="glass-card">
                        <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
                            <Icons.Zap className="text-[#a855f7]" />
                            Key Features
                        </h2>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex gap-3">
                                <span className="text-[#00d9ff]">✓</span>
                                <span>Real-time QR code scanning</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#00d9ff]">✓</span>
                                <span>Advanced phishing detection</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#00d9ff]">✓</span>
                                <span>Risk scoring algorithm</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#00d9ff]">✓</span>
                                <span>Detailed threat analysis</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#00d9ff]">✓</span>
                                <span>Scan history & analytics</span>
                            </li>
                        </ul>
                    </div>

                    <div className="glass-card">
                        <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
                            <Icons.Code className="text-[#00d9ff]" />
                            Technologies
                        </h2>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex gap-3">
                                <span className="text-[#a855f7]">→</span>
                                <span>React + JavaScript</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#a855f7]">→</span>
                                <span>Flask (Python Backend)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#a855f7]">→</span>
                                <span>OpenCV for QR Detection</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#a855f7]">→</span>
                                <span>SQLite Database</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[#a855f7]">→</span>
                                <span>Framer Motion Animations</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="glass-card mb-12">
                    <h2 className="text-2xl font-display font-bold mb-6">How It Works</h2>
                    <div className="space-y-6">
                        {[
                            { num: '01', title: 'Scan or Upload', desc: 'Use your camera for live scanning or upload a QR image' },
                            { num: '02', title: 'Decode QR', desc: 'Extract content from the QR code using OpenCV' },
                            { num: '03', title: 'Analyze URL', desc: 'Check for phishing indicators and suspicious patterns' },
                            { num: '04', title: 'Risk Assessment', desc: 'Calculate risk score and assign threat level' },
                            { num: '05', title: 'Report Results', desc: 'Display detailed analysis with actionable insights' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6 pb-6 border-b border-[rgba(255,255,255,0.1)] last:border-0 last:pb-0">
                                <div className="font-display font-bold text-2xl gradient-text">{item.num}</div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card">
                    <h2 className="text-2xl font-display font-bold mb-6">Future Roadmap</h2>
                    <ul className="grid md:grid-cols-2 gap-6 text-gray-300">
                        <li className="flex gap-3">
                            <span className="text-[#ec4899]">→</span>
                            <span>ML model integration for improved detection</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ec4899]">→</span>
                            <span>Mobile app for iOS and Android</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ec4899]">→</span>
                            <span>Browser extension for auto-detection</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ec4899]">→</span>
                            <span>API for enterprise integration</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ec4899]">→</span>
                            <span>Advanced analytics dashboard</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ec4899]">→</span>
                            <span>Real-time threat intelligence</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// ===================== Footer =====================

const Footer = () => {
    return (
        <footer className="border-t border-[rgba(255,255,255,0.1)] mt-20 py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-display font-bold mb-4">QRShield AI</h3>
                        <p className="text-gray-400 text-sm">Advanced QR code security for the modern web</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">Features</a></li>
                            <li><a href="#" className="hover:text-white transition">Security</a></li>
                            <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">About</a></li>
                            <li><a href="#" className="hover:text-white transition">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition">License</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[rgba(255,255,255,0.1)] pt-8 text-center text-gray-400 text-sm">
                    <p>© 2024 QRShield AI. Built with ❤️ for a safer web.</p>
                </div>
            </div>
        </footer>
    );
};

// ===================== Main App Component =====================

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [isDarkMode, setIsDarkMode] = useState(true);

    const renderPage = () => {
        switch(currentPage) {
            case 'home':
                return <HeroSection setCurrentPage={setCurrentPage} />;
            case 'scan':
                return <ScanPage />;
            case 'history':
                return <HistoryPage />;
            case 'about':
                return <AboutPage />;
            default:
                return <HeroSection setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className={isDarkMode ? 'dark' : 'light'} style={{backgroundColor: '#050816', color: '#e0e0e0'}}>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <main className="min-h-screen">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
