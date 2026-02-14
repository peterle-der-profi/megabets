export function BtcIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M22.5 14.2c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.6-.4-.7 2.6c-.4-.1-.9-.2-1.3-.3l.7-2.7-1.6-.4-.7 2.7c-.3-.1-.7-.2-1-.3l-2.2-.5-.4 1.7s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 0 .1 0 .1 0l-.1 0-1.1 4.5c-.1.2-.3.5-.7.4 0 0-1.2-.3-1.2-.3l-.8 1.8 2.1.5c.4.1.8.2 1.1.3l-.7 2.8 1.6.4.7-2.7c.4.1.9.2 1.3.3l-.7 2.7 1.6.4.7-2.8c3 .6 5.2.3 6.1-2.3.8-2.1 0-3.3-1.6-4.1 1.1-.3 1.9-1 2.2-2.5zm-3.9 5.4c-.5 2.1-4.2 1-5.4.7l1-3.9c1.2.3 5 .9 4.5 3.2zm.6-5.5c-.5 1.9-3.5.9-4.5.7l.9-3.5c1 .3 4.2.7 3.7 2.8z"
        fill="white"
      />
    </svg>
  );
}

export function EthIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <path d="M16.5 4v8.87l7.5 3.35L16.5 4z" fill="white" fillOpacity="0.6" />
      <path d="M16.5 4L9 16.22l7.5-3.35V4z" fill="white" />
      <path d="M16.5 21.97v6.03L24 17.62l-7.5 4.35z" fill="white" fillOpacity="0.6" />
      <path d="M16.5 28V21.97L9 17.62 16.5 28z" fill="white" />
      <path d="M16.5 20.57l7.5-4.35-7.5-3.35v7.7z" fill="white" fillOpacity="0.2" />
      <path d="M9 16.22l7.5 4.35v-7.7L9 16.22z" fill="white" fillOpacity="0.6" />
    </svg>
  );
}
