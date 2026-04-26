export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M50,10A40,40,0,1,1,10,50,40,40,0,0,1,50,10M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z" />
      <path d="M50,25A25,25,0,1,1,25,50,25,25,0,0,1,50,25m0-10A35,35,0,1,0,85,50,35,35,0,0,0,50,15Z" />
    </svg>
  );
}
