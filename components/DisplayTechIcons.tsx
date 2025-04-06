import Image from "next/image";
import { cn } from "@/lib/utils"; // Removed getTechLogos import

// Define AND export the expected shape of the icon data
export interface TechIconData {
  tech: string;
  url: string;
}

// Define the new props interface
interface DisplayTechIconsProps {
  icons: TechIconData[];
}

// Remove async, change prop from techStack to icons
const DisplayTechIcons = ({ icons }: DisplayTechIconsProps) => {
  // No need to call getTechLogos here anymore

  return (
    <div className="flex flex-row">
      {/* Map directly over the passed icons prop */}
      {icons.slice(0, 3).map(({ tech, url }, index) => (
        <div 
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2.5 flex flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>

          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
