import { isAfterToday } from "@/utils/helpers";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function CreationCardDate({
  dates,
  cssClassInProgress,
  cssClassFinished,
}: {
  dates: any;
  cssClassInProgress: string;
  cssClassFinished: string;
}) {
  return (
    <>
      {dates && isAfterToday(dates[dates.length - 1].creationDatesDay) ? (
        <div className={cssClassInProgress}>
          {dates[0].creationDatesDay} -{" "}
          {dates[dates.length - 1].creationDatesDay}
        </div>
      ) : (
        <div className={cssClassFinished}>Terminé</div>
      )}
    </>
  );
}
