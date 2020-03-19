import * as React from 'react';
import { DateRange, RangeInput } from './RangeTypes';
import { MaterialUiPickersDate } from '../typings/date';
import { BasePickerProps } from '../typings/BasePicker';
import { DesktopWrapper } from '../wrappers/DesktopWrapper';
import { DateRangePickerInput } from './DateRangePickerInput';
import { parsePickerInputValue } from '../_helpers/date-utils';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { SomeWrapper, ExtendWrapper } from '../wrappers/Wrapper';
import { AllSharedPickerProps } from '../Picker/SharedPickerProps';
import { MuiPickersAdapter, useUtils } from '../_shared/hooks/useUtils';
import { makeWrapperComponent } from '../wrappers/makeWrapperComponent';
import { DateRangePickerCalendar, DateRangePickerCalendarProps } from './DateRangePickerCalendar';

export function parseRangeInputValue(
  now: MaterialUiPickersDate,
  utils: MuiPickersAdapter,
  { value = [null, null], defaultHighlight }: BasePickerProps<RangeInput, DateRange>
) {
  return value.map(date =>
    parsePickerInputValue(now, utils, { value: date, defaultHighlight })
  ) as DateRange;
}

export function makeRangePicker<TWrapper extends SomeWrapper>(Wrapper: TWrapper) {
  const WrapperComponent = makeWrapperComponent<RangeInput, DateRange>(Wrapper, {
    KeyboardDateInputComponent: DateRangePickerInput,
    PureDateInputComponent: DateRangePickerInput,
  });

  function RangePickerWithStateAndWrapper({
    calendars,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    shouldDisableDate,
    showDaysOutsideCurrentMonth,
    onMonthChange,
    disableHighlightToday,
    reduceAnimations,
    ...other
  }: DateRangePickerCalendarProps &
    AllSharedPickerProps<RangeInput, DateRange> &
    ExtendWrapper<TWrapper>) {
    const utils = useUtils();
    const { pickerProps, inputProps, wrapperProps } = usePickerState<RangeInput, DateRange>(other, {
      parseInput: parseRangeInputValue,
      areValuesEqual: (a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1]),
      validateInput: () => undefined,
    });

    return (
      <WrapperComponent inputProps={inputProps} wrapperProps={wrapperProps} {...other}>
        <DateRangePickerCalendar
          DateInputProps={inputProps}
          calendars={calendars}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          shouldDisableDate={shouldDisableDate}
          showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
          onMonthChange={onMonthChange}
          disableHighlightToday={disableHighlightToday}
          reduceAnimations={reduceAnimations}
          {...pickerProps}
        />
      </WrapperComponent>
    );
  }

  RangePickerWithStateAndWrapper.defaultProps = {
    inputFormat: 'MM',
  };

  return RangePickerWithStateAndWrapper;
}

export const DateRangePicker = makeRangePicker(DesktopWrapper);