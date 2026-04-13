import { isAfterToday } from "@/utils/helpers";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function CreationButtonBooking({
  dates,
  urlBooking,
  cssClass,
}: any) {
  return (
    <>
      {dates &&
        (isAfterToday(dates[dates.length - 1].creationDatesDay) ? (
          <>
            {urlBooking !== null ? (
              <a href={urlBooking} target="_blank" className={`${cssClass}`}>
                Réserver sur BilletReduc
              </a>
            ) : (
              <div className={`${cssClass}`}>Bientôt disponible</div>
            )}
          </>
        ) : (
          <div className={`${cssClass}`}>Réservation terminée</div>
        ))}
    </>
  );
}
