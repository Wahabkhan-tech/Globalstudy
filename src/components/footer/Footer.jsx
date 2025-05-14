import { useState, useEffect } from 'react';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check for modal backdrop to detect if a modal is open
    const checkModal = () => {
      const modalBackdrop = document.querySelector('.bg-black.bg-opacity-50');
      setIsModalOpen(!!modalBackdrop);
    };

    // Run check immediately and on DOM changes
    checkModal();
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { childList: true, subtree: true });

    // Handle scroll behavior
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowFooter(false);
      } else {
        setShowFooter(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 w-full bg-[#FAF9F6] text-blue-500 p-4 transition-all duration-500 ease-in-out ${
        showFooter && !isModalOpen ? 'h-16 opacity-100' : 'h-0 opacity-0'
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