import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'gold' | 'champagne' | 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  variant = 'gold'
}) => {
  const sizeClasses = {
    sm: {
      height: 28,
      sphereSize: 'w-7 h-7',
      divider: 'h-6 w-[2px] mx-1 sm:mx-1.5',
      text: 'text-base sm:text-lg',
      tag: 'text-[8px] tracking-[0.25em]'
    },
    md: {
      height: 38,
      sphereSize: 'w-9 h-9',
      divider: 'h-8 w-[2.5px] mx-1.5 sm:mx-2',
      text: 'text-xl sm:text-2xl',
      tag: 'text-[9px] tracking-[0.3em]'
    },
    lg: {
      height: 52,
      sphereSize: 'w-13 h-13',
      divider: 'h-11 w-[3.5px] mx-2 sm:mx-3',
      text: 'text-3xl sm:text-4xl',
      tag: 'text-[10px] tracking-[0.35em]'
    },
    xl: {
      height: 72,
      sphereSize: 'w-18 h-18',
      divider: 'h-16 w-[4.5px] mx-3 sm:mx-4',
      text: 'text-4xl sm:text-5xl',
      tag: 'text-xs tracking-[0.35em]'
    }
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center">
        {/* 1. Golden Spherical Waves Icon Mark */}
        <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses.sphereSize}`}>
          <svg
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-md overflow-visible"
          >
            <defs>
              {/* Primary Gold Ribbon Gradient */}
              <linearGradient id="amalfiGoldShine" x1="15%" y1="10%" x2="85%" y2="90%">
                <stop offset="0%" stopColor="#FFF1B8" />
                <stop offset="18%" stopColor="#E5C158" />
                <stop offset="38%" stopColor="#FFF4C2" />
                <stop offset="55%" stopColor="#D4AF37" />
                <stop offset="78%" stopColor="#966C10" />
                <stop offset="100%" stopColor="#D8B145" />
              </linearGradient>

              {/* Band 1 Gradient */}
              <linearGradient id="bandGrad1" x1="58%" y1="5%" x2="85%" y2="28%">
                <stop offset="0%" stopColor="#D4A020" />
                <stop offset="40%" stopColor="#FFF6CE" />
                <stop offset="75%" stopColor="#E2BD4E" />
                <stop offset="100%" stopColor="#8A5F0C" />
              </linearGradient>

              {/* Band 2 Gradient */}
              <linearGradient id="bandGrad2" x1="26%" y1="14%" x2="88%" y2="40%">
                <stop offset="0%" stopColor="#9C7214" />
                <stop offset="20%" stopColor="#DDAF32" />
                <stop offset="42%" stopColor="#FFF7D1" />
                <stop offset="70%" stopColor="#C99B27" />
                <stop offset="100%" stopColor="#7E5509" />
              </linearGradient>

              {/* Band 3 Gradient */}
              <linearGradient id="bandGrad3" x1="14%" y1="28%" x2="88%" y2="43%">
                <stop offset="0%" stopColor="#94680E" />
                <stop offset="22%" stopColor="#E1B53B" />
                <stop offset="48%" stopColor="#FFF8D6" />
                <stop offset="76%" stopColor="#C59620" />
                <stop offset="100%" stopColor="#764D06" />
              </linearGradient>

              {/* Band 4 (Center) Gradient */}
              <linearGradient id="bandGrad4" x1="12%" y1="48%" x2="89%" y2="48%">
                <stop offset="0%" stopColor="#885E0C" />
                <stop offset="20%" stopColor="#DCAE33" />
                <stop offset="45%" stopColor="#FFF9DA" />
                <stop offset="72%" stopColor="#C0901B" />
                <stop offset="100%" stopColor="#6C4505" />
              </linearGradient>

              {/* Band 5 Gradient */}
              <linearGradient id="bandGrad5" x1="15%" y1="67%" x2="87%" y2="58%">
                <stop offset="0%" stopColor="#80560A" />
                <stop offset="25%" stopColor="#D7A72D" />
                <stop offset="50%" stopColor="#FFF8D4" />
                <stop offset="78%" stopColor="#B88716" />
                <stop offset="100%" stopColor="#633E04" />
              </linearGradient>

              {/* Band 6 Gradient */}
              <linearGradient id="bandGrad6" x1="24%" y1="82%" x2="84%" y2="67%">
                <stop offset="0%" stopColor="#7A4E08" />
                <stop offset="30%" stopColor="#D4A229" />
                <stop offset="58%" stopColor="#FFF7D0" />
                <stop offset="82%" stopColor="#AF7D12" />
                <stop offset="100%" stopColor="#583503" />
              </linearGradient>

              {/* Band 7 Gradient */}
              <linearGradient id="bandGrad7" x1="40%" y1="90%" x2="78%" y2="80%">
                <stop offset="0%" stopColor="#734706" />
                <stop offset="38%" stopColor="#D9A92F" />
                <stop offset="65%" stopColor="#FFF7CF" />
                <stop offset="90%" stopColor="#A8750E" />
                <stop offset="100%" stopColor="#553202" />
              </linearGradient>
            </defs>

            {/* 7 Swirling Golden Ribbons forming the 3D Sphere */}
            {/* Ribbon 1: Top crescent */}
            <path
              d="M 585 58 C 660 90 770 180 848 282 C 770 195 678 128 585 58 Z"
              fill="url(#bandGrad1)"
            />

            {/* Ribbon 2: Upper arched band */}
            <path
              d="M 264 146 C 410 70 560 120 732 248 C 812 308 860 365 880 398 C 825 330 735 258 605 190 C 470 120 345 130 264 146 Z"
              fill="url(#bandGrad2)"
            />

            {/* Ribbon 3: Upper-middle band */}
            <path
              d="M 140 342 C 160 270 200 220 220 218 C 365 240 540 305 730 380 C 815 412 865 425 884 425 C 840 435 760 415 625 358 C 475 295 310 275 140 342 Z"
              fill="url(#bandGrad3)"
            />

            {/* Ribbon 4: Main middle band */}
            <path
              d="M 122 430 C 120 480 124 535 142 562 C 280 520 485 520 685 530 C 790 535 855 510 888 460 C 860 480 775 490 645 478 C 480 462 290 415 122 430 Z"
              fill="url(#bandGrad4)"
            />

            {/* Ribbon 5: Lower-middle wave band */}
            <path
              d="M 152 630 C 180 690 212 735 245 745 C 370 695 530 670 705 650 C 800 640 850 610 864 576 C 825 615 725 635 570 648 C 390 662 250 622 152 630 Z"
              fill="url(#bandGrad5)"
            />

            {/* Ribbon 6: Lower wave band */}
            <path
              d="M 248 795 C 295 845 350 875 385 882 C 485 825 610 780 735 730 C 800 702 830 680 838 672 C 790 718 695 762 550 802 C 410 840 305 818 248 795 Z"
              fill="url(#bandGrad6)"
            />

            {/* Ribbon 7: Bottom cap crescent */}
            <path
              d="M 408 894 C 475 908 555 905 618 880 C 700 845 750 805 772 792 C 720 835 635 878 528 896 C 470 905 428 900 408 894 Z"
              fill="url(#bandGrad7)"
            />
          </svg>
        </div>

        {/* 2. Vertical Divider Bar */}
        <div
          className={`${sizeClasses.divider} shrink-0 opacity-95 rounded-[0.5px]`}
          style={{
            background: 'linear-gradient(180deg, #C49326 0%, #F5DE77 35%, #FFF5B0 50%, #D6A42E 75%, #A6740F 100%)'
          }}
        />

        {/* 3. Typography "4WOMAN'S" */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <span
              className={`font-black uppercase text-transparent bg-clip-text ${sizeClasses.text} leading-none`}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                letterSpacing: '0.015em',
                backgroundImage:
                  'linear-gradient(90deg, #B8861E 0%, #D5A42D 18%, #F7E272 40%, #FFF39F 49%, #F1D35F 58%, #D6A329 82%, #AD7712 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              4WOMAN'S
            </span>
          </div>
        </div>
      </div>

      {showTagline && (
        <span className={`mt-1 font-sans uppercase font-bold text-[#C29B91] ${sizeClasses.tag}`}>
          Longevidade • Beleza • Alta Performance
        </span>
      )}
    </div>
  );
};
