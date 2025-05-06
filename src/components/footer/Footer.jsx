import { useState, useEffect } from 'react';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowFooter(false);
      } else {
        setShowFooter(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 w-full bg-[#FAF9F6] text-blue-500 p-4 transition-all duration-500 ease-in-out ${
        showFooter ? 'h-16 opacity-100' : 'h-0 opacity-0'
      } overflow-hidden z-50 shadow-md`}
      style={{
        width: window.innerWidth - (window.innerWidth === window.outerWidth ? 0 : 16),
      }}
    >
      <p className="text-center text-sm">© 2025 Global Study Dashboard</p>
    </div>
  );
};

export default Footer;