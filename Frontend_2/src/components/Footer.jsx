

export default function Footer() {
  return (
    <footer className="relative bottom-0 w-full bg-white shadow mt-0 sm:mt-8">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} My Blog. All rights reserved.
        </div>
      </footer>
  )
}
