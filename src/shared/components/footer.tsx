export default function Footer() {
  return (
    <span className="text-label font-semibold text-content-standard-secondary text-center">
      &copy; 2023-{new Date().getFullYear()} Seungpyo Suh.
      <br />
      All rights reserved.
    </span>
  );
}
