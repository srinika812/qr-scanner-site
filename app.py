"""
QRShield AI - Premium QR Quishing Detection System
Main Flask application with full API endpoints
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
from datetime import datetime
import json
import base64
import sqlite3
from pathlib import Path

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Create upload folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize SQLite database
DB_PATH = 'qrshield.db'

def init_db():
    """Initialize SQLite database with scan history table"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scan_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            qr_content TEXT,
            url TEXT,
            is_safe BOOLEAN,
            risk_score INTEGER,
            threat_level TEXT,
            reasons TEXT,
            scan_source TEXT,
            ip_address TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_db()

# ==================== QR Detection Engine ====================

class QRDetectionEngine:
    """Advanced QR code detection and quishing analysis engine"""
    
    SUSPICIOUS_KEYWORDS = {
        'login', 'verify', 'account', 'update', 'confirm',
        'bank', 'wallet', 'payment', 'reward', 'prize',
        'free', 'crypto', 'bitcoin', 'bonus', 'gift',
        'claim', 'validate', 'authenticate', 'password'
    }
    
    URL_SHORTENERS = {
        'bit.ly', 'tinyurl.com', 't.co', 'cutt.ly',
        'rb.gy', 'shorturl.at', 'ow.ly', 'buff.ly',
        'adf.ly', 'short.link', 'goo.gl'
    }
    
    @staticmethod
    def decode_qr(image):
        """Decode QR code from image using OpenCV"""
        try:
            detector = cv2.QRCodeDetector()
            data, points, straight_qr = detector.detectAndDecode(image)
            
            if data:
                return data.strip()
            return None
        except Exception as e:
            print(f"QR Decode Error: {str(e)}")
            return None
    
    @staticmethod
    def analyze_url(url):
        """
        Comprehensive URL analysis for phishing/quishing detection
        Returns: (risk_score, threat_level, reasons_list)
        """
        if not url:
            return 0, "Low", ["No URL detected"]
        
        risk_score = 0
        reasons = []
        
        url_lower = url.lower()
        
        # 1. HTTPS vs HTTP check
        if url.startswith('https://'):
            reasons.append("✓ Uses secure HTTPS protocol")
        elif url.startswith('http://'):
            risk_score += 20
            reasons.append("⚠ Uses insecure HTTP protocol")
        else:
            risk_score += 10
            reasons.append("⚠ Invalid or missing protocol")
        
        # 2. IP address detection
        if _is_ip_address(url):
            risk_score += 25
            reasons.append("⚠ Direct IP address instead of domain")
        
        # 3. URL shortener detection
        if _is_url_shortener(url, QRDetectionEngine.URL_SHORTENERS):
            risk_score += 30
            reasons.append("⚠ Suspicious URL shortener detected")
        
        # 4. Suspicious keyword detection
        suspicious_found = _find_suspicious_keywords(url, QRDetectionEngine.SUSPICIOUS_KEYWORDS)
        if suspicious_found:
            risk_score += 25
            reasons.append(f"⚠ Suspicious keywords: {', '.join(suspicious_found)}")
        
        # 5. Subdomain analysis
        subdomain_count = url.count('.')
        if subdomain_count > 3:
            risk_score += 15
            reasons.append(f"⚠ Excessive subdomains detected ({subdomain_count})")
        
        # 6. URL length check
        if len(url) > 100:
            risk_score += 10
            reasons.append("⚠ Unusually long URL")
        
        # 7. Special characters check
        if url.count('%') > 2:
            risk_score += 10
            reasons.append("⚠ Excessive URL encoding detected")
        
        # Normalize score to 0-100
        risk_score = min(100, max(0, risk_score))
        
        if risk_score >= 0 and len(reasons) == 1 and "✓" in reasons[0]:
            reasons = ["✓ URL appears legitimate"]
            threat_level = "Low"
        elif risk_score < 35:
            threat_level = "Low"
        elif risk_score < 70:
            threat_level = "Medium"
        else:
            threat_level = "High"
        
        return risk_score, threat_level, reasons

def _is_ip_address(url):
    """Check if URL contains IP address"""
    import re
    ip_pattern = r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'
    return bool(re.search(ip_pattern, url))

def _is_url_shortener(url, shorteners):
    """Check if URL uses a known shortener service"""
    url_lower = url.lower()
    for shortener in shorteners:
        if shortener in url_lower:
            return True
    return False

def _find_suspicious_keywords(url, keywords):
    """Find suspicious keywords in URL"""
    url_lower = url.lower()
    found = []
    for keyword in keywords:
        if keyword in url_lower:
            found.append(keyword)
    return list(set(found))

# ==================== Database Operations ====================

def save_scan_to_history(qr_content, url, is_safe, risk_score, threat_level, reasons, scan_source):
    """Save scan result to SQLite database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO scan_history 
            (qr_content, url, is_safe, risk_score, threat_level, reasons, scan_source)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            qr_content,
            url or '',
            is_safe,
            risk_score,
            threat_level,
            json.dumps(reasons),
            scan_source
        ))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Database Error: {str(e)}")
        return False

def get_scan_history(limit=None):
    """Retrieve scan history from database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        if limit:
            cursor.execute('SELECT * FROM scan_history ORDER BY timestamp DESC LIMIT ?', (limit,))
        else:
            cursor.execute('SELECT * FROM scan_history ORDER BY timestamp DESC')
        
        rows = cursor.fetchall()
        conn.close()
        
        return [dict(row) for row in rows]
    except Exception as e:
        print(f"Database Error: {str(e)}")
        return []

def get_statistics():
    """Get dashboard statistics"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('SELECT COUNT(*) FROM scan_history')
        total_scans = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM scan_history WHERE is_safe = 1')
        safe_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT COUNT(*) FROM scan_history WHERE is_safe = 0')
        suspicious_count = cursor.fetchone()[0]
        
        cursor.execute('SELECT AVG(risk_score) FROM scan_history')
        avg_risk = cursor.fetchone()[0] or 0
        
        conn.close()
        
        return {
            'total_scans': total_scans,
            'safe_count': safe_count,
            'suspicious_count': suspicious_count,
            'average_risk_score': round(avg_risk, 1)
        }
    except Exception as e:
        print(f"Statistics Error: {str(e)}")
        return {
            'total_scans': 0,
            'safe_count': 0,
            'suspicious_count': 0,
            'average_risk_score': 0
        }

def delete_all_history():
    """Clear all scan history"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM scan_history')
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Delete Error: {str(e)}")
        return False

def delete_scan_by_id(scan_id):
    """Delete specific scan record"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM scan_history WHERE id = ?', (scan_id,))
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Delete Error: {str(e)}")
        return False

# ==================== Flask Routes ====================

@app.route('/')
def index():
    """Serve main application"""
    return render_template('index.html')

@app.route('/api/detect/webcam', methods=['POST'])
def detect_from_webcam():
    """Detect QR code from webcam frame (base64 encoded)"""
    try:
        data = request.json
        if not data or 'frame' not in data:
            return jsonify({'error': 'No frame provided'}), 400
        
        # Decode base64 frame
        frame_data = data['frame'].split(',')[1] if ',' in data['frame'] else data['frame']
        frame_bytes = base64.b64decode(frame_data)
        nparr = np.frombuffer(frame_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({'error': 'Invalid frame data'}), 400
        
        # Detect QR code
        qr_data = QRDetectionEngine.decode_qr(image)
        
        if not qr_data:
            return jsonify({
                'success': False,
                'message': 'No QR code detected. Try another angle.',
                'qr_data': None
            }), 200
        
        # Analyze for phishing
        risk_score, threat_level, reasons = QRDetectionEngine.analyze_url(qr_data)
        is_safe = threat_level == "Low"
        
        # Save to history
        save_scan_to_history(qr_data, qr_data, is_safe, risk_score, threat_level, reasons, 'webcam')
        
        return jsonify({
            'success': True,
            'qr_content': qr_data,
            'url': qr_data if qr_data.startswith('http') else None,
            'risk_score': risk_score,
            'threat_level': threat_level,
            'is_safe': is_safe,
            'reasons': reasons,
            'scan_source': 'webcam',
            'timestamp': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/detect/upload', methods=['POST'])
def detect_from_upload():
    """Detect QR code from uploaded image"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Read file
        file_bytes = file.read()
        nparr = np.frombuffer(file_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({'error': 'Invalid image file'}), 400
        
        # Detect QR code
        qr_data = QRDetectionEngine.decode_qr(image)
        
        if not qr_data:
            return jsonify({
                'success': False,
                'message': 'No QR code detected in this image.',
                'qr_data': None
            }), 200
        
        # Analyze for phishing
        risk_score, threat_level, reasons = QRDetectionEngine.analyze_url(qr_data)
        is_safe = threat_level == "Low"
        
        # Save to history
        save_scan_to_history(qr_data, qr_data, is_safe, risk_score, threat_level, reasons, 'upload')
        
        return jsonify({
            'success': True,
            'qr_content': qr_data,
            'url': qr_data if qr_data.startswith('http') else None,
            'risk_score': risk_score,
            'threat_level': threat_level,
            'is_safe': is_safe,
            'reasons': reasons,
            'scan_source': 'upload',
            'timestamp': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get scan history"""
    try:
        history = get_scan_history()
        for item in history:
            if item['reasons']:
                item['reasons'] = json.loads(item['reasons'])
        return jsonify({'success': True, 'history': history}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history/<int:scan_id>', methods=['DELETE'])
def delete_history_item(scan_id):
    """Delete specific scan record"""
    try:
        if delete_scan_by_id(scan_id):
            return jsonify({'success': True, 'message': 'Record deleted'}), 200
        return jsonify({'error': 'Failed to delete'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/history/clear', methods=['DELETE'])
def clear_history():
    """Clear all scan history"""
    try:
        if delete_all_history():
            return jsonify({'success': True, 'message': 'All history cleared'}), 200
        return jsonify({'error': 'Failed to clear history'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/statistics', methods=['GET'])
def get_stats():
    """Get dashboard statistics"""
    try:
        stats = get_statistics()
        return jsonify({'success': True, 'statistics': stats}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'app': 'QRShield AI'}), 200

# ==================== Error Handlers ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Route not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
