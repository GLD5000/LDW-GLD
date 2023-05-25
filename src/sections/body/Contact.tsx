import { useEffect } from 'react';
import useIntersectionObserver from '../../utilities/hooks/useIntersectionObserver';
import { useIntersectionProviderContext } from '../../utilities/contexts/IntersectionProvider';
import WritingSvg from '../../assets/icons/WritingSvg';
import PaperPlaneSvg from '../../assets/icons/PaperPlaneSvg';

export default function Contact() {
  const { elementRef, onScreen } = useIntersectionObserver();
  const { setcurrentSection } = useIntersectionProviderContext();
  useEffect(() => {
    let run = true;
    const refElement = elementRef.current;
    if (run && onScreen && refElement != null) {
      setcurrentSection(refElement.id);
    }

    return () => {
      run = false;
    };
  }, [onScreen, elementRef, setcurrentSection]);

  return (
    <section
      id="contact-section"
      ref={elementRef}
      className="flex flex-col gap-12 min-h-screen pt-40 sm:pt-36 snap-none lg:px-20 w-[calc(100vw-1rem)] xs:w-body-sm min-w-body max-w-body sm:w-body mx-auto"
    >
      <div className="h-fit min-w-[300px] mx-auto w-fit xs:w-full bg-darkgreen dark:bg-lightgreen border-darkgreen dark:border-lightgreen shadow-md border-4 rounded-2xl max-w-body sm:mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold w-full   text-darkblue py-6  mx-auto text-center">
          @LondonDataWeek Updates
        </h2>
        <a
          className="twitter-timeline"
          data-width="100%"
          data-height="700"
          data-theme="dark"
          href="https://twitter.com/londondataweek?ref_src=twsrc%5Etfw"
          target="_blank"
          rel="noreferrer"
        >
          Refresh to see tweets by @LondonDataWeek!
        </a>
      </div>

      <form
        className="flex flex-col max-w-body sm:min-w-[18rem] mx-auto w-full  border-4 dark:border-pink border-darkpink shadow-md rounded-xl text-current gap-4"
        action="https://formsubmit.co/londondataweek@gmail.com"
        method="POST"
      >
        <div className="grid bg-darkpink dark:bg-pink text-darkblue pb-2">
          <div className="h-24 w-32 mx-auto ">
            <WritingSvg />
          </div>
          {/* <h3 className="text-2xl mb-2 font-bold w-fit mx-auto">Write a Message</h3> */}
          <h2 className="text-3xl sm:text-4xl font-bold w-fit mx-auto">Get in Touch</h2>
        </div>

        <input
          id="name-input"
          name="name"
          aria-label="name"
          className=" h-16 w-full border-transparent border-2 border-b-darkblue dark:border-b-pink p-2 bg-transparent text-base sm:text-lg placeholder:text-current "
          type="text"
          placeholder="Name"
          required
        />
        <input
          id="email-input"
          name="email"
          aria-label="email"
          className=" h-16 w-full border-transparent border-2 border-b-darkblue dark:border-b-pink p-2 bg-transparent text-base sm:text-lg placeholder:text-current "
          type="email"
          placeholder="Email"
          required
        />
        <input type="hidden" name="_subject" value="London Data Week Contact Form" />
        <textarea
          id="message-input"
          name="message"
          aria-label="message"
          className=" w-full border-transparent border-2 border-b-darkblue dark:border-b-pink p-2 bg-transparent text-base sm:text-lg placeholder:text-current  resize-y"
          placeholder="Message"
          rows={5}
          wrap="hard"
          required
        />
        <button
          className="my-6 rounded-full w-60 flex flex-row items-center justify-center gap-2 h-12 text-lg sm:text-xl mx-auto px-4 py-2 font-bold text-darkblue dark:text-darkblue bg-darkpink dark:bg-pink hover:transition focus:transition hover:text-white hover:bg-darkblue  focus:text-white focus:bg-darkblue  dark:hover:bg-white  dark:focus:bg-white"
          type="submit"
        >
          <PaperPlaneSvg />
          Send Message
        </button>
      </form>
    </section>
  );
}
