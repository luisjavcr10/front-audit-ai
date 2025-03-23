import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export const ModelIcon: React.FC = () => {
  const {theme} = useTheme();

  const fill = theme === 'light' ? 'black' : 'white';

  return (
    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9151 5.97522C11.0214 6.24397 11.2776 6.41897 11.5651 6.41897V6.42522C11.8589 6.42522 12.1089 6.25022 12.2151 5.98147L12.4276 5.43772C12.5151 5.21272 12.6964 5.02522 12.9276 4.93772L13.4651 4.72522C13.7339 4.61897 13.9089 4.36272 13.9089 4.07522C13.9089 3.78772 13.7401 3.53772 13.4714 3.43147L12.9276 3.21897C12.8141 3.175 12.711 3.10782 12.6249 3.02173C12.5388 2.93563 12.4716 2.83251 12.4276 2.71897L12.2151 2.17522C12.1642 2.04428 12.0748 1.93178 11.9588 1.85247C11.8429 1.77315 11.7056 1.73071 11.5651 1.73071C11.4246 1.73071 11.2874 1.77315 11.1714 1.85247C11.0554 1.93178 10.9661 2.04428 10.9151 2.17522L10.7026 2.71272C10.6587 2.82626 10.5915 2.92938 10.5054 3.01548C10.4193 3.10157 10.3162 3.16875 10.2026 3.21272L9.66512 3.42522C9.39637 3.53147 9.22137 3.78772 9.22137 4.07522C9.22137 4.36272 9.39012 4.61272 9.65887 4.71897L10.2026 4.93147C10.4276 5.01897 10.6151 5.20022 10.7026 5.43147L10.9151 5.97522ZM11.5651 5.06272C11.3839 4.61897 11.0214 4.25647 10.5776 4.07522C11.0214 3.89397 11.3776 3.53147 11.5651 3.08772C11.7464 3.53147 12.1089 3.89397 12.5526 4.07522C12.1089 4.25647 11.7526 4.61897 11.5651 5.06272ZM5.56387 13.8615C5.72637 14.274 6.12012 14.5427 6.56387 14.5427C7.00762 14.5427 7.40137 14.274 7.56387 13.8615L8.13262 12.4177C8.45762 11.6052 9.10137 10.9552 9.91387 10.6365L11.3576 10.0677C11.7701 9.90522 12.0389 9.51147 12.0389 9.06772C12.0389 8.62397 11.7701 8.23022 11.3576 8.06772L9.91387 7.49897C9.51152 7.33865 9.14607 7.09802 8.83981 6.79177C8.53356 6.48552 8.29293 6.12006 8.13262 5.71772L7.56387 4.27397C7.40137 3.86147 7.00762 3.59272 6.56387 3.59272C6.12012 3.59272 5.72637 3.86147 5.56387 4.27397L4.99512 5.71772C4.8348 6.12006 4.59417 6.48552 4.28792 6.79177C3.98167 7.09802 3.61621 7.33865 3.21387 7.49897L1.77012 8.06772C1.35762 8.23022 1.08887 8.62397 1.08887 9.06772C1.08887 9.51147 1.35762 9.90522 1.77012 10.0677L3.21387 10.6365C4.02637 10.9615 4.67637 11.6052 4.99512 12.4177L5.56387 13.8615ZM6.43887 4.63022C6.46387 4.55522 6.52012 4.54272 6.56387 4.54272C6.60762 4.54272 6.66387 4.56147 6.68887 4.63022L7.25762 6.07397C7.4638 6.59571 7.77486 7.0696 8.17155 7.46629C8.56824 7.86298 9.04212 8.17404 9.56387 8.38022L11.0076 8.94897C11.0826 8.97397 11.0951 9.03022 11.0951 9.07397C11.0951 9.11772 11.0764 9.17397 11.0076 9.19897L9.56387 9.76772C9.04212 9.9739 8.56824 10.285 8.17155 10.6817C7.77486 11.0783 7.4638 11.5522 7.25762 12.074L6.68887 13.5177C6.63262 13.6615 6.49512 13.6615 6.43887 13.5177L5.87012 12.074C5.66394 11.5522 5.35288 11.0783 4.95619 10.6817C4.55949 10.285 4.08561 9.9739 3.56387 9.76772L2.12012 9.19897C2.04512 9.17397 2.03262 9.11772 2.03262 9.07397C2.03262 9.03022 2.05137 8.97397 2.12012 8.94897L3.56387 8.38022C4.08561 8.17404 4.55949 7.86298 4.95619 7.46629C5.35288 7.0696 5.66394 6.59571 5.87012 6.07397L6.43887 4.63022Z" fill={fill}/>
    </svg>
  );
};
