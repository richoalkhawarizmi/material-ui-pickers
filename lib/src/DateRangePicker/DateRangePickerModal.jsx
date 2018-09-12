import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ModalWrapper from '../wrappers/ModalWrapper';
import DomainPropTypes from '../constants/prop-types';
import BaseRangePicker from './BaseRangePicker';
import DateRangePicker from './DateRangePicker';

export const DatePickerModal = (props) => {
  const {
    allowKeyboardControl,
    animateYearScrolling,
    disableFuture,
    disablePast,
    format,
    forwardedRef,
    labelFunc,
    leftArrowIcon,
    maxDate,
    minDate,
    onChange,
    openToYearSelection,
    renderDay,
    rightArrowIcon,
    shouldDisableDate,
    value,
    classes,
    ...other
  } = props;

  return (
    <BaseRangePicker {...props}>
      {
        ({
          range,
          utils,
          handleAccept,
          handleChange,
          handleDismiss,
          isAccepted,
        }) => (
          <ModalWrapper
            disableFuture={disableFuture}
            disablePast={disablePast}
            format={format || utils.dateFormat}
            labelFunc={labelFunc}
            maxDate={maxDate}
            minDate={minDate}
            onAccept={handleAccept}
            onDismiss={handleDismiss}
            ref={forwardedRef}
            value={value}
            isAccepted={isAccepted}
            dialogContentClassName={classes.dialogContent}
            {...other}
          >
            <DateRangePicker
              range={range}
              allowKeyboardControl={allowKeyboardControl}
              animateYearScrolling={animateYearScrolling}
              disableFuture={disableFuture}
              disablePast={disablePast}
              leftArrowIcon={leftArrowIcon}
              maxDate={maxDate}
              minDate={minDate}
              onChange={handleChange}
              openToYearSelection={openToYearSelection}
              renderDay={renderDay}
              rightArrowIcon={rightArrowIcon}
              shouldDisableDate={shouldDisableDate}
            />
          </ModalWrapper>
        )
      }
    </BaseRangePicker>
  );
};

DatePickerModal.propTypes = {
  /** Datepicker value */
  value: DomainPropTypes.date,
  /** Min selectable date */
  minDate: DomainPropTypes.date,
  /** Max selectable date */
  maxDate: DomainPropTypes.date,
  /** Date format string for input */
  format: PropTypes.string,
  /** Callback firing when date accepted [(date: Date) => void] */
  onChange: PropTypes.func.isRequired,
  /** Auto accept date on selection */
  autoOk: PropTypes.bool,
  /** Disable past dates */
  disablePast: PropTypes.bool,
  /** Disable future dates */
  disableFuture: PropTypes.bool,
  /** To animate scrolling to current year (with scrollIntoView) */
  animateYearScrolling: PropTypes.bool,
  /** Allow to specify dynamic label for text field
   * [(date: Date, invalidLabel: string) => string]
  */
  labelFunc: PropTypes.func,
  /** Left arrow icon */
  leftArrowIcon: PropTypes.node,
  /** Right arrow icon */
  rightArrowIcon: PropTypes.node,
  /** Custom renderer for day
   * [(date: Date, nowSelectedDate: Date, isInCurrentMonth: boolean) => ReactElement]
  */
  renderDay: PropTypes.func,
  /** Disable specific date [(date: Date) => boolean] */
  shouldDisableDate: PropTypes.func,
  /** Enables keyboard listener for moving between days in calendar */
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

DatePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  disableFuture: false,
  disablePast: false,
  animateYearScrolling: false,
  allowKeyboardControl: true,
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  renderDay: undefined,
  labelFunc: undefined,
  shouldDisableDate: undefined,
  forwardedRef: undefined,
};

const styles = {
  dialogContent: {
    width: 'auto',
  },
};

const EnhancedDateRangePicker = withStyles(styles)(DatePickerModal);

export default React.forwardRef((props, ref) => (
  <EnhancedDateRangePicker {...props} forwardedRef={ref} />
));
