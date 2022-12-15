import React from 'react';

interface Props {
  color ? : string;
  width?: string;
  height?: string;
  fill?: string;
}

const ClapIcon: React.FC < Props > = ({
  color = 'rgb(180, 186, 191)',
  width = '18',
  height = '18',
  fill = 'none',
}) => (
  <svg
    id="Capa_1"
    height={height}
    viewBox="0 0 512.02 512.02"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    stroke={color}
    fill={fill}
  >
    <g fill={fill}>
      <path fill={color} d="m.046 186.268c2.362 40.153 2.164 73.45 1.989 102.828-.463 77.888-1.188 128.634 53.583 183.405 52.635 52.634 138.281 52.638 190.919 0 .001-.001.001-.002.002-.003l148.49-148.49c17.586-17.585 17.589-46.052 0-63.64-3.717-3.717-7.929-6.647-12.424-8.789l24.61-24.61c17.545-17.545 17.545-46.093 0-63.64-4.138-4.138-8.892-7.287-13.966-9.474 9.782-17.038 7.56-39.359-7.248-54.166-3.919-3.919-8.389-6.956-13.161-9.124 11.113-17.235 9.352-40.728-6.052-56.131-14.652-14.652-36.972-17.057-54.141-7.253-2.225-5.144-5.416-9.878-9.499-13.96-17.544-17.545-46.094-17.546-63.62-.019-.912.908-79.383 79.095-129.632 129.272l-7.715-54.548c-.608-24.27-20.441-43.842-44.984-43.842-24.57 0-44.397 19.602-44.986 43.899-.011.415-.003.831.021 1.245 1.201 20.398 1.852 40.931 2.031 64.055-10.122 9.483-14.782 22.978-14.217 32.985zm373.77 116.528-148.492 148.492c-40.938 40.939-107.553 40.94-148.493 0-45.489-45.489-45.257-84.431-44.796-162.014.176-29.656.376-63.243-1.998-104.036.751-12.837 16.455-18.847 25.581-9.721 5.089 5.089 3.14 7.279 4.543 12.718.003.027.007.054.012.08l12.04 85.142c1.73 12.22 16.722 17.247 25.46 8.505 25.89-25.894-2.714 2.694 149.295-149.261 5.875-5.439 15.071-5.32 20.782.39 5.863 5.863 5.863 15.35 0 21.213-.002.002-.003.004-.005.006l-63.635 63.634c-5.858 5.858-5.858 15.355 0 21.213 5.856 5.858 15.354 5.858 21.213 0 4.98-4.98 79.894-79.893 84.854-84.853 5.85-5.848 15.365-5.848 21.212.001 5.863 5.863 5.863 15.35 0 21.213 0 0-79.883 79.883-84.853 84.853-5.858 5.858-5.858 15.355 0 21.213 5.857 5.858 15.355 5.858 21.213 0l63.64-63.64c5.85-5.849 15.367-5.848 21.213 0 5.849 5.849 5.85 15.365.001 21.213-10.59 10.59-59.02 59.02-63.64 63.64-5.858 5.858-5.858 15.355 0 21.213 5.857 5.858 15.355 5.858 21.213 0l42.502-42.502c5.856-5.773 15.314-5.747 21.138.075 5.863 5.862 5.863 15.35 0 21.213zm-9.027-181.892c5.863 5.863 5.863 15.35 0 21.213l-3.385 3.385c-2.177-4.547-5.131-8.742-8.802-12.412-3.67-3.67-7.864-6.624-12.412-8.801l3.393-3.392c5.849-5.841 15.361-5.839 21.206.007zm21.214 84.853-3.405 3.405c-2.142-4.497-5.063-8.713-8.782-12.432-3.718-3.718-7.934-6.64-12.431-8.782l3.404-3.404c5.85-5.849 15.367-5.848 21.213-.001 5.848 5.849 5.849 15.365.001 21.214zm-40.427-150.108c5.845 5.845 5.868 15.305.037 21.176-1.912 1.897 11.052-10.964-47.849 47.465-2.177-4.547-5.131-8.742-8.802-12.413-3.686-3.686-7.862-6.587-12.315-8.725 2.673-2.661 46.048-45.844 47.714-47.504 5.853-5.849 15.367-5.847 21.215.001zm-235.717 129.274c44.802-44.809 149.789-149.417 150.863-150.487 5.851-5.849 15.365-5.848 21.214 0 5.596 5.596 5.803 14.393.882 20.241-140.276 139.994 65.966-66.279-185.109 184.82l-7.53-53.243c6.008 4.567 14.402 3.949 19.68-1.331zm-67.636-96.725c.748-12.834 16.456-18.844 25.581-9.72 5.089 5.09 3.139 7.278 4.542 12.717.004.028 9.836 69.552 9.836 69.552-8.819-12.86-23.16-19.871-38.055-19.581-.286-18.664-.908-35.858-1.904-52.968z" />
    </g>
  </svg>
);

export default ClapIcon;
