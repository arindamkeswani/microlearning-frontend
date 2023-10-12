const Header = () => {
  return (
    <>
      <nav className="flex justify-between items-center w-full h-[75px] z-10 px-2.5 sm:px-7 py-4 shadow-lg fixed top-0 left-0">
        {/* left section */}
        <div className="flex gap-2 sm:gap-4 items-center cursor-pointer">
          <img
            className="h-full w-[2.5rem] object-cover"
            src="/Images/Logo_1.jpg"
            alt=""
          />
          <h3 className="text-sm sm:text-base whitespace-nowrap">
            Mircro Learning
          </h3>
        </div>

        <div className="flex gap-3 pr-3 sm:pr-5 sm:pt-3">
          <div className="flex items-center gap-1.5 sm:gap-3 font-gilroy-medium">
            <span className="text-xs sm:text-sm whitespace-nowrap">
              Lokesh Agrawal
            </span>
            <i className="sm:w-10 sm:h-10 w-7 h-7 fa-solid fa-user text-xs sm:text-base flex justify-center cursor-pointer items-center rounded-full bg-[#e6e6e6] px-2 py-2 sm:px-3.5 sm:py-3"></i>
          </div>
          <div className="flex sm:w-10 sm:h-10 w-7 h-7 justify-center cursor-pointer items-center rounded-full bg-[#e6e6e6] px-3.5 py-3">
            <i className="fa-solid fa-right-from-bracket text-xs sm:text-base"></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
