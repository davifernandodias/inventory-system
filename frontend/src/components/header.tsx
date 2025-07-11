import { ModeToggle } from "./mode-toggle";

export default function Header () {
  return (
    <header>
      <nav className="flex justify-between gap-2 m-2">
        <p>header</p>
        <ModeToggle />
      </nav>
    </header>
  )
}