import type { SVGProps } from "react";

export function SoundCloudIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18V5l12-4v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.62c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.092zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-2.148-.72-3.048-1.224-3.048-1.224-1.584 1.584-2.784 4.044-2.784 4.044s.72.384 1.176.684c-1.2.336-2.34.636-3.336.78-.684.048-1.128.012-1.128.012l.12-.216c1.2-.432 1.944-1.02 1.944-1.02s-1.296-2.076-2.58-3.072c0 0-1.392 1.92-1.392 5.064 0 0 .936 1.74 3.432 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416s.336.252.636.456c.636.312 1.224.564 1.764.78.48.168.924.3 1.284.384.036.012.084.024.12.036.216.06.444.108.672.144.252.036.504.072.756.096.12.012.228.024.336.036.84.084 1.692.096 2.544.024zm-5.46-5.412c.78 0 1.416-.636 1.416-1.416s-.636-1.416-1.416-1.416-1.416.636-1.416 1.416.636 1.416 1.416 1.416zm3.336 0c.78 0 1.416-.636 1.416-1.416s-.636-1.416-1.416-1.416-1.416.636-1.416 1.416.636 1.416 1.416 1.416z" />
    </svg>
  );
}

export function RedditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.25 15.62c-.414 0-.75-.336-.75-.75s.336-.75.75-.75c.414 0 .75.336.75.75s-.336.75-.75.75zm4.5 0c-.414 0-.75-.336-.75-.75s.336-.75.75-.75c.414 0 .75.336.75.75s-.336.75-.75.75zm2.74-5.32c-.37-.37-.88-.37-1.25 0l-1.95 1.95c-.32.32-.84.2-1.06-.21-.01-.02-.02-.03-.02-.05l.89-3.23c.12-.45-.21-.89-.67-.89-.04 0-.09 0-.13.01l-4.22.99c-.45.11-.7.58-.59 1.03s.58.7 1.03.59l3.3-.77.16.59-1.99 4.91c-.17.43.04.93.47 1.11.43.17.93-.04 1.11-.47l2.06-5.09 1.95 1.95c.34.34.9.34 1.25 0 .38-.37.38-.98 0-1.35z" />
    </svg>
  );
}

export function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.23174 23 20.46348"
      {...props}
      fill="currentColor"
    >
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function NextjsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-label="Next.js logomark"
      role="img"
      viewBox="0 0 180 180"
      width="24"
      height="24"
      {...props}
    >
      <mask
        id="a"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="180"
        height="180"
      >
        <circle cx="90" cy="90" r="90" fill="currentColor"></circle>
      </mask>
      <g mask="url(#a)">
        <circle
          cx="90"
          cy="90"
          r="90"
          fill="currentColor"
        ></circle>
        <path
          d="M149.509 157.52L69.143 54H54v72h12.114V77.448L140.491 157.52c2.14 2.14 4.846 3.479 7.893 3.479s5.753-1.339 7.893-3.479a11.12 11.12 0 000-15.732z"
          fill="url(#b)"
          className="fill-background"
        ></path>
        <path
          d="M126 54h-12v72h12V54z"
          fill="url(#c)"
          className="fill-background"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="158.581"
          y1="166.602"
          x2="59.904"
          y2="45.19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" className="text-foreground"></stop>
          <stop offset="1" stopColor="currentColor" className="text-foreground"></stop>
        </linearGradient>
        <linearGradient
          id="c"
          x1="120"
          y1="54"
          x2="120"
          y2="126"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" className="text-foreground"></stop>
          <stop offset="1" stopColor="currentColor" className="text-foreground"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function NodejsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M11.75,22.5a9.75,9.75,0,0,1-3.51-18.9,1.5,1.5,0,0,1,1,2.81,6.75,6.75,0,0,0,2.5,13.28,1.5,1.5,0,0,1-0.05,3A9.45,9.45,0,0,1,11.75,22.5Zm-1.57-4.14a8.26,8.26,0,0,1-1.63-2.31,8,8,0,0,1,10-9.4,1.5,1.5,0,0,1,1,2.82,5.2,5.2,0,0,0-1,2.83,4.9,4.9,0,0,0,3.34,4.66,1.5,1.5,0,0,1,.81,2.94A8.25,8.25,0,0,1,10.18,18.36Z" />
    </svg>
  );
}

export function TailwindIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.001,4.529c-3.444,0-6.438,2.021-7.863,4.887L1.2,6.014v10.569h10.569l-3.359-3.359c0.762-1.36,2.232-2.308,3.959-2.308c2.481,0,4.5,2.019,4.5,4.5c0,2.481-2.019,4.5-4.5,4.5s-4.5-2.019-4.5-4.5H3.001c0,4.971,4.029,9,9,9s9-4.029,9-9S16.972,4.529,12.001,4.529z" />
    </svg>
  );
}

export function DreamcoderLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
