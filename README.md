# EphemeralShare - Secure Self-Destructing Messages

A stealth, fast, and minimal text-sharing app that instantly self-deletes after one view.

## Features

- **One-Time Read**: Messages auto-delete after a single view
- **Client-Side Encryption**: AES-256 encryption before uploading to server
- **No Authentication**: Completely anonymous - no accounts needed
- **Auto-Expire**: Messages automatically delete after 24 hours
- **Dark Modern UI**: Glassmorphism design with smooth animations
- **Lightning Fast**: Minimal, optimized interface

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Firebase Firestore
- **Animations**: Framer Motion
- **Encryption**: Web Crypto API (AES-GCM)

## Getting Started

### Prerequisites
- Node.js 16+
- Firebase project

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/ephemeral-share.git
cd ephemeral-share
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up Firebase configuration
   - Create a `.env` file in the root directory
   - Add your Firebase credentials:
\`\`\`
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

5. Build for production
\`\`\`bash
npm run build
\`\`\`

## How It Works

### Message Creation
1. User writes a message on the home page
2. Frontend encrypts the message using AES-256-GCM
3. Encrypted data + salt + IV + password are stored in Firestore
4. A unique 48-character ID is generated
5. A shareable link is created: `https://ephemeralshare.app/m/{id}`

### Message Reading
1. Recipient opens the link
2. Frontend fetches the encrypted message from Firestore
3. Message is decrypted using the stored password
4. Once "Read" button is clicked, message is deleted from database
5. Recipient sees "Already Deleted" on any subsequent attempts

### Security Features

- **Client-Side Encryption**: Messages are encrypted before leaving your device
- **PBKDF2 Key Derivation**: 100,000 iterations for strong password derivation
- **Random Salt**: Each message uses a unique 128-bit salt
- **Random IV**: Each encryption uses a unique 96-bit initialization vector
- **AES-GCM**: Provides both confidentiality and authenticity

### Limitations

- Not military-grade security (designed for everyday privacy)
- Server administrators can access encrypted data (though they can't decrypt it)
- No protection against browser-level attacks
- Messages expire after 24 hours (can be configured)

## Deployment

### Deploy to Vercel
\`\`\`bash
npm run deploy
\`\`\`

### Deploy to Firebase Hosting
\`\`\`bash
npm run build
firebase deploy
\`\`\`

## API Endpoints (Firebase Functions - Optional)

- `POST /api/message` - Create new message
- `GET /api/message/:id` - Retrieve message (marks as read)
- `DELETE /api/message/:id` - Delete message

## Browser Support

- Chrome/Edge 37+
- Firefox 34+
- Safari 11+
- Opera 24+

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please fork and submit pull requests.

## Support

Found a bug? Please open an issue on GitHub.

---

Built with security and simplicity in mind.
