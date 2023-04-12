import SvgButtonNew from '../../elements/SvgButtonNew';
import HamburgerSvg from '../../icons/HamburgerSvg';
import MoonSvg from '../../icons/MoonSvg';
import SunSvg from '../../icons/SunSvg';
import { useIntersectionProviderContext } from '../../utilities/contexts/IntersectionProvider';
import InternalLink from './InternalLink';

function getDarkToggleIcon(isDark: boolean) {
  const wrapper = <div className=" text:inherit my-auto aspect-square h-6">{isDark ? <SunSvg /> : <MoonSvg />} </div>;
  return wrapper;
}

export default function NavBar({
  toggleColourTheme,
  colourTheme,
  toggleMenu,
}: {
  toggleColourTheme: () => void;
  toggleMenu: () => void;
  colourTheme: boolean;
}) {
  const { currentSection } = useIntersectionProviderContext();
  console.log('currentSection:', currentSection);

  return (
    <nav className="relative flex h-16 flex-wrap items-center justify-center gap-8 ">
      <InternalLink
        mediaVisibility="hidden sm:flex"
        link="#about-section"
        content={[
          <p
            key="text"
            className={`m-0 hidden font-bold sm:inline ${
              currentSection === 'about-section' ? 'dark:text-lightgreen text-darkgreentxt' : ''
            }`}
          >
            ABOUT
          </p>,
        ]}
      />
      <InternalLink
        mediaVisibility="hidden sm:flex"
        link="#schedule-section"
        content={[
          <p
            key="text"
            className={`m-0 hidden font-bold sm:inline ${
              currentSection === 'schedule-section' ? 'dark:text-lightgreen text-darkgreentxt' : ''
            }`}
          >
            SCHEDULE
          </p>,
        ]}
      />
      <InternalLink
        mediaVisibility="hidden sm:flex"
        link="#contact-section"
        content={[
          <p
            key="text"
            className={`m-0 hidden font-bold sm:inline ${
              currentSection === 'contact-section' ? 'dark:text-lightgreen text-darkgreentxt' : ''
            }`}
          >
            CONTACT
          </p>,
        ]}
      />

      <div className="flex flex-wrap gap-1">
        <SvgButtonNew
          showTextIn={undefined}
          clickFunction={toggleColourTheme}
          reverse={false}
          id="colour-theme-button"
          name="Dark Mode Button"
          className="relative rounded text-xs"
          buttonClasses="w-fit h-fit overflow-visible flex-col hidden xs:flex  text-txt-mid hover:text-txt-main    hover:transition focus:text-txt-main  focus:transition dark:text-txt-mid-dk dark:hover:text-txt-main-dk dark:focus:text-txt-main-dk pb-4 pt-1 mt-3 px-2"
          textElement={
            <span className="absolute bottom-0 w-full rounded-t-none bg-transparent text-inherit ">
              {colourTheme ? 'Light' : 'Dark'}
            </span>
          }
          svg={getDarkToggleIcon(colourTheme)}
        />
        <SvgButtonNew
          showTextIn={undefined}
          clickFunction={toggleMenu}
          reverse={false}
          id="colour-theme-button-main"
          name="Dark Mode Button"
          className="rounded text-xs"
          buttonClasses=" sm:hidden text-txt-mid hover:text-txt-main hover:underline hover:decoration-current hover:underline-offset-2 hover:transition focus:text-txt-main focus:underline focus:decoration-current focus:underline-offset-2 focus:transition dark:text-txt-mid-dk dark:hover:text-txt-main-dk dark:focus:text-txt-main-dk "
          textElement={null}
          svg={<HamburgerSvg />}
        />
      </div>
    </nav>
  );
}
