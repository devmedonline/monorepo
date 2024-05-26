type IconProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function AndroidIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={props.className}
      width={props.width ?? 24}
      height={props.height ?? 24}
    >
      <path
        d="M120.606 169h270.788v220.663c0 13.109-10.628 23.737-23.721 23.737H340.55v67.203c0 17.066-13.612 30.897-30.415 30.897-16.846 0-30.438-13.831-30.438-30.897V413.4h-47.371v67.203c0 17.066-13.639 30.897-30.441 30.897-16.799 0-30.437-13.831-30.437-30.897V413.4h-27.099c-13.096 0-23.744-10.628-23.744-23.737V169zm-53.065-1.801c-16.974 0-30.723 13.963-30.723 31.2v121.937c0 17.217 13.749 31.204 30.723 31.204 16.977 0 30.723-13.987 30.723-31.204V198.399c0-17.237-13.746-31.2-30.723-31.2zm323.854-20.435H120.606c3.342-38.578 28.367-71.776 64.392-90.998l-25.746-37.804c-3.472-5.098-2.162-12.054 2.946-15.525C167.3-1.034 174.242.286 177.731 5.38l28.061 41.232c15.558-5.38 32.446-8.469 50.208-8.469 17.783 0 34.672 3.089 50.229 8.476L334.29 5.395c3.446-5.108 10.41-6.428 15.512-2.957 5.108 3.471 6.418 10.427 2.946 15.525l-25.725 37.804c36.024 19.21 61.032 52.408 64.372 90.997zm-177.53-52.419c0-8.273-6.699-14.983-14.969-14.983-8.291 0-14.99 6.71-14.99 14.983 0 8.269 6.721 14.976 14.99 14.976s14.969-6.707 14.969-14.976zm116.127 0c0-8.273-6.722-14.983-14.99-14.983-8.291 0-14.97 6.71-14.97 14.983 0 8.269 6.679 14.976 14.97 14.976 8.269 0 14.99-6.707 14.99-14.976zm114.488 72.811c-16.956 0-30.744 13.984-30.744 31.222v121.98c0 17.238 13.788 31.226 30.744 31.226 16.978 0 30.701-13.987 30.701-31.226v-121.98c.001-17.238-13.723-31.222-30.701-31.222z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1.5 0 20 20"
      className={props.className}
      width={props.width ?? 24}
      height={props.height ?? 24}
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill="currentColor" transform="translate(-102 -7439)">
          <g transform="translate(56 160)">
            <path d="M57.57 7282.193c.73-.845 1.221-2.022 1.087-3.193-1.05.04-2.322.671-3.075 1.515-.677.749-1.267 1.946-1.108 3.094 1.172.087 2.368-.57 3.097-1.416m2.628 7.432c.03 3.027 2.77 4.034 2.801 4.047-.022.07-.438 1.435-1.444 2.845-.87 1.218-1.774 2.43-3.196 2.457-1.398.025-1.848-.794-3.447-.794-1.597 0-2.097.768-3.42.819-1.373.049-2.42-1.318-3.296-2.532-1.794-2.483-3.164-7.017-1.324-10.077.915-1.52 2.548-2.482 4.321-2.506 1.348-.025 2.621.869 3.445.869.825 0 2.372-1.075 3.998-.917.68.027 2.591.263 3.818 1.984-.1.059-2.28 1.275-2.256 3.805"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
