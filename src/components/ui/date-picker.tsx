"use client";

// react aria components imports
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label
} from "react-aria-components";

// react hook form imports
import { type FieldError } from "react-hook-form";

// custom components imports
import { IconButton } from "./button";
import CustomPopover from "./popover";
import { ErrorField } from "./error-field";

// custom icons imports
import { CalenderIcon } from "@/components/icons/calender";
import { RightArrowIcon } from "@/components/icons/right-arrow";
import { LeftArrowIcon } from "@/components/icons/left-arrow";

// date parser imports
import { getLocalTimeZone, today, CalendarDateTime, CalendarDate } from "@internationalized/date";

// types
type CustomDatePickerProps = {
  value?: Date;
  onChange?: (event: { target: { value: Date } }) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  showLabel?: boolean;
  minValue?: Date;
  maxValue?: Date;
  className?: string;
  error?: string | FieldError;
  label?: string;
  showRequiredStar?: boolean;
  allowFutureDates?: boolean;
};

export default function CustomDatePicker({
  value,
  onChange,
  isDisabled,
  isRequired,
  showLabel = true,
  label,
  minValue,
  maxValue,
  className,
  error,
  showRequiredStar,
  allowFutureDates
}: CustomDatePickerProps) {
  const handleChange = (date: { day?: number; month?: number; year?: number }) => {
    const day = date.day;
    const month = date.month;
    const year = date.year;

    if (!day || !month || !year) return;

    if (onChange) {
      const newValue = new CalendarDateTime(year, month, day, value?.getHours() || 5, value?.getMinutes() || 30).toDate(
        getLocalTimeZone()
      );
      onChange({
        target: {
          value: newValue
        }
      });
    }
  };

  return (
    <div className="flex flex-col space-y-0.5">
      <DatePicker
        className="group flex flex-col gap-1 w-fit"
        minValue={minValue && new CalendarDate(minValue.getFullYear(), minValue.getMonth() + 1, minValue.getDate())}
        maxValue={
          maxValue
            ? new CalendarDate(maxValue.getFullYear(), maxValue.getMonth() + 1, maxValue.getDate())
            : allowFutureDates
              ? undefined
              : today(getLocalTimeZone())
        }
        value={
          value
            ? new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate())
            : today(getLocalTimeZone())
        }
        onChange={handleChange}
        isDisabled={isDisabled}
        shouldForceLeadingZeros
      >
        <Group className="flex pt-1.5">
          <div className={`flex h-11 relative items-center rounded-6 border ${className ?? ""}`}>
            <Label className="text-background text-sm absolute -top-2.5 left-4 bg-white px-1">
              {showLabel && (label ?? "Date")}
              {isRequired && <span className="text-error"> *</span>}
            </Label>
            <DateInput className="flex flex-1 px-2.5 pt-1.5 pb-1">
              {(segment) => <DateSegment segment={segment} className="placeholder-shown:italic" />}
            </DateInput>
            {showRequiredStar ? <span className="text-error -ml-1">*</span> : null}
            <IconButton icon={CalenderIcon} isDisabled={isDisabled} />
          </div>
        </Group>
        <CustomPopover>
          <Dialog className="p-6 text-gray-600">
            <Calendar>
              <header className="flex items-center gap-1 pb-4 px-1 font-serif w-full">
                <Heading className="flex-1 font-semibold text-2xl ml-2" />
                <IconButton slot="previous" icon={LeftArrowIcon} isRound={true} />
                <IconButton slot="next" icon={RightArrowIcon} isRound={true} />
              </header>
              <CalendarGrid className="border-spacing-1 border-separate">
                <CalendarGridHeader>
                  {(day) => <CalendarHeaderCell className="text-lg font-semibold">{day}</CalendarHeaderCell>}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className="w-9 h-9 outline-none cursor-pointer rounded-full flex items-center justify-center hover:bg-accent5 selected:bg-accent3 selected:text-white disabled:text-bg_light disabled:cursor-default"
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </CustomPopover>
      </DatePicker>
      {error && <ErrorField message={error} />}
    </div>
  );
}
