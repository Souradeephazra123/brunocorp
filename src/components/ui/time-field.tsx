"use client";

// react imports
import { useEffect, useState } from "react";
// react-aria-components
import {
  DateInput,
  DateSegment,
  Dialog,
  DialogTrigger,
  Label,
  ListBox,
  ListBoxItem,
  TimeField,
} from "react-aria-components";
// date parser
import { Time } from "@internationalized/date";
// custom components
import { IconButton } from "./button";
import CustomPopover from "./popover";
// icons
import { ClockIcon } from "@/components/icons/clock";

// types
type CustomTimeFieldProps = {
  value?: Date;
  onChange?: (event: { target: { value: Date } }) => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  allowFutureTimes?: boolean;
  hideLabel?: boolean;
};

export default function CustomTimeField({
  value=new Date(),
  isDisabled,
  onChange,
  isRequired,
  allowFutureTimes,
  hideLabel = false,
}: CustomTimeFieldProps) {
  const [activeHour, setActiveHour] = useState<number>(0);
  const [maxHour, setMaxHour] = useState<number>(23);

  console.log("value", value);
  console.log("onchange", onChange);

  useEffect(() => {
    if (value) {
      if (
        !allowFutureTimes &&
        value.toISOString().split("T")[0] ===
          new Date().toISOString().split("T")[0]
      ) {
        const tmpH = new Date().getHours();
        setMaxHour(tmpH);
      } else {
        setMaxHour(23);
      }

      const tmp = value.getHours();
      setActiveHour(tmp);
    }
  }, [value, allowFutureTimes]);

  const handleTimeChange = (hour: number) => {
    if (value && onChange) {
      const newValue = new Date(value);
      newValue.setHours(hour, 0);

      onChange({
        target: {
          value: newValue,
        },
      });
    }
  };

  return (
    <DialogTrigger>
      <TimeField
        aria-label="Time"
        className="flex items-center pt-1.5"
        hourCycle={24}
        hideTimeZone
        // isDisabled={isDisabled}
        value={new Time(activeHour, 0)}
      >
        <div className="flex min-w-28 h-11 relative items-center justify-between rounded-6 border">
          {!hideLabel && (
            <Label className="text-background text-sm absolute -top-2.5 left-4 bg-white px-1">
              Time{isRequired && <span className="text-error"> *</span>}
            </Label>
          )}
          <DateInput className="flex flex-1 mx-2.5 max-w-fit">
            {(segment) => (
              <DateSegment
                segment={segment}
                className="gap-2 placeholder-shown:italic"
              />
            )}
          </DateInput>
          <IconButton icon={ClockIcon} isDisabled={isDisabled} />
        </div>
      </TimeField>
      <CustomPopover placement="top right">
        <Dialog className="flex max-h-96 overflow-clip">
          {({ close }) => (
            <ListBox
              aria-label="Time"
              key="hours"
              selectionMode="single"
              className="overflow-y-scroll no-scrollbar px-3 border-r"
            >
              {[...Array(24).keys()].map((hour) => (
                <ListBoxItem
                  aria-label="Time"
                  key={hour}
                  className={`my-2 px-1 rounded-4 text-center ${
                    activeHour === hour ? "bg-yellow-500 text-white" : ""
                  } hover:bg-accent4 disabled:text-bg_light`}
                  onAction={() => {
                    handleTimeChange(hour);
                    console.log("Selected hour:", hour);
                    close();
                  }}
                  isDisabled={hour > maxHour}
                >
                  {`${hour.toString().padStart(2, "0")} : 00`}
                </ListBoxItem>
              ))}
            </ListBox>
          )}
        </Dialog>
      </CustomPopover>
    </DialogTrigger>
  );
}
