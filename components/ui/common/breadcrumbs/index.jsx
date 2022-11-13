import { ActiveLink } from "@components/ui/common"

export default function Breadcrumbs({items}) {
    
    return (
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
          {items.map((item, i) => {
            return (
            <li
              key={i}
              
            >
              <ActiveLink 
                href={item.href}
                legacyBehavior
              >
                <a
                  className={`${i == 0 ? "pr-4" : "px-4"} font-medium text-gray-500 hover:text-gray-900`}
                >
                  {item.value}
                </a>
              </ActiveLink>
            </li>
          )})}
        </ol>
      </nav>
    )
  }