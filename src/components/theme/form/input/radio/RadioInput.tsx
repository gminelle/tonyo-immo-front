import useFormErrorParser from '@components/theme/form/hook/FormErrorParserHook';
import { SelectOptionProps } from '@components/theme/form/input/FormInputTypes';
import { FormHelperText } from '@material-ui/core';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import { ReactNode } from 'react';
import { Controller, ControllerRenderProps, FieldError, RegisterOptions, useFormContext } from 'react-hook-form';
import { FieldValues } from 'react-hook-form-mui';
import scss from '../form-input.module.scss';

type RadioInputProps = {
  name: string,
  options: SelectOptionProps[],
  dataTestid?: string,
  rules?: RegisterOptions,
  errorMessageMapping?: (error: FieldError) => string | undefined,
  renderOption?: (option: SelectOptionProps) => ReactNode,
};

export default function RadioInput(
  {
    name,
    options,
    dataTestid,
    rules,
    errorMessageMapping,
    renderOption,
  }: Readonly<RadioInputProps>,
) {
  const { control, formState: { errors } } = useFormContext();
  const { parseError } = useFormErrorParser({ errorMapping: errorMessageMapping });

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
        <>
          <RadioGroup
            {...field}
            orientation="vertical"
            slotProps={{
              root: {
                'data-testid': dataTestid,
              },
            }}
          >
            {options.map((option: SelectOptionProps) => (
              <Radio
                key={option.value}
                color="neutral"
                value={option.value}
                label={
                  renderOption
                    ? renderOption(option)
                    : <span>{option.label}</span>
                }
                variant={field.value === option.value ? 'solid' : 'outlined'}
                className={scss.radio}
              />
            ))}
          </RadioGroup>
          {
            errors[name]
            && (
              <FormHelperText error className={scss.inputErrorHelperText}>
                {parseError(errors[name] as FieldError)}
              </FormHelperText>
            )
          }
        </>
      )}
    />
  );
}
