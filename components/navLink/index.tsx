import Link from "next/link";

// Navigation Link Component
interface NavLinkProps {
 href: string;
 icon: React.ReactNode;
 label: string;
 mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label, mobile }) => {
 return (
  <Link
   href={href}
   className={`
        flex items-center 
        ${mobile ? 'flex-col' : 'space-x-3'}
        text-gray-700 hover:text-primary 
        transition-colors duration-200
      `}
  >
   {icon}
   <span className={mobile ? 'text-xs mt-1' : 'text-md'}>{label}</span>
  </Link>
 );
};

export default NavLink  