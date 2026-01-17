export const metadata = {
  title: 'ChatBot',
  description: 'A friendly chatbot interface',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          @keyframes typing {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.7;
            }
            30% {
              transform: translateY(-10px);
              opacity: 1;
            }
          }

          @keyframes typing {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.7;
            }
            30% {
              transform: translateY(-10px);
              opacity: 1;
            }
          }

          .dot:nth-child(1) {
            animation-delay: 0s;
          }

          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }

          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          input:focus {
            border-color: #667eea !important;
          }

          button:hover {
            transform: scale(1.05);
          }

          button:active {
            transform: scale(0.95);
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
