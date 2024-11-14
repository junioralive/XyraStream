"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./header.module.css"

const Links = ({ isMobile }) => {
  const pathname = usePathname()

  const links = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    // { name: "News", path: "/news" },
    { name: "Collection", path: "/collection?type=tv&genre=10759" },
    { name: "Trending", path: "/trending?type=tv&provider=8" }
  ]

  if (isMobile) {
    return (
      <div className="flex flex-col h-full justify-between items-center text-[#c4c2c7] p-2 gap-1 overflow-hidden">
        {links.map((link, index) => (
          <Link
            href={link.path}
            key={link.name}
            className={`${(pathname === "/" ? "Home" : pathname).includes(link.name.toLowerCase()) ? "text-white bg-[#242233] border-2 border-[#313e5038]" : ""} w-full h-full text-center py-[6px] rounded-md hover:bg-[#242233] border-2 border-transparent hover:border-[#313e5038] relative ${styles.animate_ltr}`}
            style={{ animationDelay: `${index * 0.13}s` }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="flex mt-[8px] text-[#c4c2c7] max-[990px]:hidden">
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={link.name}
          className={`${index === 0 ? "ml-6" : "ml-4"} ${(pathname === "/" ? "home" : pathname).includes(link.name.toLowerCase()) ? "text-white" : ""}`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default Links
