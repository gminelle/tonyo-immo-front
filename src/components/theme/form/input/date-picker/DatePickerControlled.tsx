import useFormErrorParser from '@components/theme/form/hook/FormErrorParserHook';
import { FormHelperText } from '@mui/material';
import { Dayjs } from 'dayjs';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldError,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import scss from '../form-input.module.scss';
import DatePicker from './DatePicker';

type DatePickerControlledProps = {
  name: string,
  rules?: RegisterOptions<FieldValues, string>,
  maxDate?: Dayjs,
  minDate?: Dayjs,
  errorMessageMapping?: (error: FieldError) => string | undefined,
  shortFormat?: boolean,
};

export default function DatePickerControlled(
  {
    name,
    rules,
    maxDate,
    minDate,
    errorMessageMapping,
    shortFormat = false,
  }: Readonly<DatePickerControlledProps>,
) {
  const { control, formState: { errors } } = useFormContext();
  const { parseError } = useFormErrorParser({ errorMapping: errorMessageMapping });

  return (
    <div
      className={scss.formControl}
    >
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={(
          { field, fieldState }: {
            field: ControllerRenderProps<FieldValues, string>,
            fieldState: ControllerFieldState,
          }) => (
          <DatePicker
            {...field}
            displayError={!!fieldState.error}
            maxDate={maxDate}
            minDate={minDate}
            shortFormat={shortFormat}
          />
        )}
      />
      {
        errors[name]
        && (
          <FormHelperText error className={scss.inputErrorHelperText}>
            {parseError(errors[name] as FieldError)}
          </FormHelperText>
        )
      }
    </div>
  );
}
