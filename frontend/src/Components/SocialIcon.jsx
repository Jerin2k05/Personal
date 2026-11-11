function SocialIcon({ type, size = 22 }) {
  if (type === 'youtube') {
    return (
      <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M23 7.1a3 3 0 0 0-2.1-2.12C19.05 4.46 12 4.46 12 4.46s-7.05 0-8.9.52A3 3 0 0 0 1 7.1 31.3 31.3 0 0 0 .48 12 31.3 31.3 0 0 0 1 16.9a3 3 0 0 0 2.1 2.12c1.85.52 8.9.52 8.9.52s7.05 0 8.9-.52A3 3 0 0 0 23 16.9a31.3 31.3 0 0 0 .52-4.9A31.3 31.3 0 0 0 23 7.1Z" fill="#ff0033" />
        <path d="m9.6 15.4 6.2-3.4-6.2-3.4v6.8Z" fill="#fff" />
      </svg>
    )
  }

  if (type === 'instagram') {
    return (
      <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2.1" y="2.1" width="19.8" height="19.8" rx="5.8" stroke="#c13584" strokeWidth="2" />
        <circle cx="12" cy="12" r="4.3" stroke="#c13584" strokeWidth="2" />
        <circle cx="18" cy="6.4" r="1.3" fill="#e0a13d" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2.5" fill="#fff" stroke="#d7dce2" />
      <path d="m3.3 6 8.7 6.7L20.7 6" stroke="#d93025" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3.2 18 6.1-5.3" stroke="#4285f4" strokeWidth="1.6" />
      <path d="m20.8 18-6.1-5.3" stroke="#34a853" strokeWidth="1.6" />
    </svg>
  )
}

export default SocialIcon
