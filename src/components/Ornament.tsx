export default function Ornament() {
  return (
    <div aria-hidden className="mx-auto flex w-44 items-center gap-3 text-gold">
      <span className="h-px flex-1 bg-current opacity-50" />
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path d="M6 0l6 6-6 6-6-6z" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-50" />
    </div>
  );
}
