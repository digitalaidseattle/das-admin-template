/**
 * MapPage.tsx
 * Display information of a ticket
 */

// react
import { useState } from 'react';


// material-ui
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { DeleteOutlined } from '@ant-design/icons';
import {
  DateCalendar, DateField, DatePicker, DayCalendarSkeleton,
  LocalizationProvider, PickersCalendarHeaderProps, PickersDay, pickersDayClasses, PickersDayProps
} from '@mui/x-date-pickers';
import { add, isSameDay, startOfDay } from 'date-fns';
import { format } from 'date-fns/format';

const Labels = {
  title: 'Calendar Example',
  description: 'The example shows different ways to add a date, then display it.',
  dateEntries: 'Multiple date entry',
  datelist: 'Selected Dates',
  static: 'Static Caldendars'
}

const CustomCalendarHeader = (props: PickersCalendarHeaderProps<Date>) => {
  const { currentMonth } = props;
  return (
    <Stack spacing={1} direction="row">
      <Typography variant="body2">{format(currentMonth, "MMMM yyy")}</Typography>
    </Stack>
  );
}

function CustomDay(props: PickersDayProps<Date> & { highlightedDays?: Date[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = highlightedDays.find(d => isSameDay(d, props.day)) !== undefined;
  // logic could be injected here to vary the color
  const special = {
    [`&.${pickersDayClasses.selected}`]: {
      backgroundColor: "cyan"
    }
  }
  return (
    // pickersDayClasses.selected
    <PickersDay {...other}
      sx={special}
      selected={isSelected}
      outsideCurrentMonth={outsideCurrentMonth} day={day} />
  );
}

const CalendarPage = () => {
  const theme = useTheme();
  const [highlightedDays, setHighlightedDays] = useState<Date[]>([]);
  const [fieldDate, setFieldDate] = useState<Date | null>(new Date());
  const [pickerDate, setPickerDate] = useState<Date | null>(new Date());

  const addFieldDate = () => {
    if (fieldDate) {
      const mySet = new Set(highlightedDays);
      mySet.add(startOfDay(fieldDate));
      setHighlightedDays(Array.from(mySet));
    }
  }

  const addPickerDate = () => {
    if (pickerDate) {
      const mySet = new Set(highlightedDays);
      mySet.add(startOfDay(pickerDate));
      setHighlightedDays(Array.from(mySet));
    }
  }

  const removeDate = (index: number) => {
    highlightedDays.splice(index, 1)
    setHighlightedDays([...highlightedDays]);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* Title row */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Stack direction="row" justifyContent={'space-between'} >
            <Typography variant="h5" color={theme.palette.text.primary}>{Labels.title}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Stack direction="row" justifyContent={'space-between'} >
            <Typography>{Labels.description}</Typography>
          </Stack>
        </Grid>
        {/* Different ways to add Dates */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            <Typography variant="h6" color={theme.palette.text.primary}>{Labels.dateEntries}</Typography>
            <Stack direction="row" spacing={2}>
              <DateField label="Basic date field"
                value={fieldDate}
                onChange={(d) => setFieldDate(d)} />
              <Button variant="outlined" onClick={addFieldDate}>Add</Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <DatePicker label="Basic date picker"
                value={pickerDate}
                onChange={(d) => setPickerDate(d)} />
              <Button variant="outlined" onClick={addPickerDate}>Add</Button>
            </Stack>
          </Stack>
        </Grid>
        {/* Display dates  */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            <Typography variant="h6" color={theme.palette.text.primary}>{Labels.datelist}</Typography>
            {highlightedDays.map((d, idx) =>
              <Stack direction="row" spacing={2}>
                <IconButton onClick={() => removeDate(idx)} size={'small'}>
                  <DeleteOutlined />
                </IconButton>
                <Typography color={theme.palette.text.primary}>{format(d, "MMMM d yyy")}</Typography>
              </Stack>
            )}
          </Stack>
        </Grid>

        {/* Static calendar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            <Typography variant="h6" color={theme.palette.text.primary}>{Labels.static}</Typography>

            <DateCalendar
              defaultValue={new Date()}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                day: CustomDay,
                calendarHeader: CustomCalendarHeader
              }}
              slotProps={{
                day: {
                  highlightedDays,
                } as any,
              }}
              readOnly={true}
            />
            <DateCalendar
              defaultValue={add(new Date(), { months: 1 })}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                day: CustomDay,
                calendarHeader: CustomCalendarHeader
              }}
              slotProps={{
                day: {
                  highlightedDays,
                } as any,
              }}
              readOnly={true}
            />
          </Stack>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default CalendarPage;
